
#pragma GCC system_header


#ifndef _GLIBCXX_OSTREAM
#define _GLIBCXX_OSTREAM 1

#pragma GCC system_header

#include <ios>

namespace std
{

  template<typename _CharT, typename _Traits>
    class basic_ostream : virtual public basic_ios<_CharT, _Traits>
    {
    public:
      // Types (inherited from basic_ios (27.4.4)):
      typedef _CharT                     		char_type;
      typedef typename _Traits::int_type 		int_type;
      typedef typename _Traits::pos_type 		pos_type;
      typedef typename _Traits::off_type 		off_type;
      typedef _Traits                    		traits_type;
      
      // Non-standard Types:
      typedef basic_streambuf<_CharT, _Traits> 		__streambuf_type;
      typedef basic_ios<_CharT, _Traits>		__ios_type;
      typedef basic_ostream<_CharT, _Traits>		__ostream_type;
      typedef num_put<_CharT, ostreambuf_iterator<_CharT, _Traits> >        
      							__num_put_type;
      typedef ctype<_CharT>           			__ctype_type;

      template<typename _CharT2, typename _Traits2>
        friend basic_ostream<_CharT2, _Traits2>&
        operator<<(basic_ostream<_CharT2, _Traits2>&, _CharT2);
 
      template<typename _Traits2>
        friend basic_ostream<char, _Traits2>&
        operator<<(basic_ostream<char, _Traits2>&, char);
 
      template<typename _CharT2, typename _Traits2>
        friend basic_ostream<_CharT2, _Traits2>&
        operator<<(basic_ostream<_CharT2, _Traits2>&, const _CharT2*);
 
      template<typename _Traits2>
        friend basic_ostream<char, _Traits2>&
        operator<<(basic_ostream<char, _Traits2>&, const char*);
 
      template<typename _CharT2, typename _Traits2>
        friend basic_ostream<_CharT2, _Traits2>&
        operator<<(basic_ostream<_CharT2, _Traits2>&, const char*);


      explicit 
      basic_ostream(__streambuf_type* __sb)
      { this->init(__sb); }


      virtual 
      ~basic_ostream() { }

      // [27.6.2.3] prefix/suffix
      class sentry;
      friend class sentry;
      

      inline __ostream_type&
      operator<<(__ostream_type& (*__pf)(__ostream_type&));
      
      inline __ostream_type&
      operator<<(__ios_type& (*__pf)(__ios_type&));
      
      inline __ostream_type&
      operator<<(ios_base& (*__pf) (ios_base&));


      __ostream_type& 
      operator<<(long __n);
      
      __ostream_type& 
      operator<<(unsigned long __n);

      __ostream_type& 
      operator<<(bool __n);

      __ostream_type& 
      operator<<(short __n)
      { 
	ios_base::fmtflags __fmt = this->flags() & ios_base::basefield;
	if (__fmt & ios_base::oct || __fmt & ios_base::hex)
	  return this->operator<<(static_cast<unsigned long>
				  (static_cast<unsigned short>(__n)));
	else
	  return this->operator<<(static_cast<long>(__n));
      }

      __ostream_type& 
      operator<<(unsigned short __n)
      { return this->operator<<(static_cast<unsigned long>(__n)); }

      __ostream_type& 
      operator<<(int __n)
      { 
	ios_base::fmtflags __fmt = this->flags() & ios_base::basefield;
	if (__fmt & ios_base::oct || __fmt & ios_base::hex)
	  return this->operator<<(static_cast<unsigned long>
				  (static_cast<unsigned int>(__n)));
	else
	  return this->operator<<(static_cast<long>(__n));
      }

      __ostream_type& 
      operator<<(unsigned int __n)
      { return this->operator<<(static_cast<unsigned long>(__n)); }

#ifdef _GLIBCXX_USE_LONG_LONG
      __ostream_type& 
      operator<<(long long __n);

      __ostream_type& 
      operator<<(unsigned long long __n);
#endif

      __ostream_type& 
      operator<<(double __f);

      __ostream_type& 
      operator<<(float __f)
      { return this->operator<<(static_cast<double>(__f)); }

      __ostream_type& 
      operator<<(long double __f);

      __ostream_type& 
      operator<<(const void* __p);

      /**
       *  @brief  Extracting from another streambuf.
       *  @param  sb  A pointer to a streambuf
       *
       *  This function behaves like one of the basic arithmetic extractors,
       *  in that it also constructs a sentry object and has the same error
       *  handling behavior.
       *
       *  If @a sb is NULL, the stream will set failbit in its error state.
       *
       *  Characters are extracted from @a sb and inserted into @c *this
       *  until one of the following occurs:
       *
       *  - the input stream reaches end-of-file,
       *  - insertion into the output sequence fails (in this case, the
       *    character that would have been inserted is not extracted), or
       *  - an exception occurs while getting a character from @a sb, which
       *    sets failbit in the error state
       *
       *  If the function inserts no characters, failbit is set.
      */
      __ostream_type& 
      operator<<(__streambuf_type* __sb);
      //@}

      // [27.6.2.6] unformatted output functions
      /**
       *  @name Unformatted Output Functions
       *
       *  All the unformatted output functions have some common behavior.
       *  Each starts by constructing a temporary object of type
       *  std::basic_ostream::sentry.  This has several effects, concluding
       *  with the setting of a status flag; see the sentry documentation
       *  for more.
       *
       *  If the sentry status is good, the function tries to generate
       *  whatever data is appropriate for the type of the argument.
       *
       *  If an exception is thrown during insertion, ios_base::badbit
       *  will be turned on in the stream's error state.  If badbit is on in
       *  the stream's exceptions mask, the exception will be rethrown
       *  without completing its actions.
      */
      //@{
      /**
       *  @brief  Simple insertion.
       *  @param  c  The character to insert.
       *  @return  *this
       *
       *  Tries to insert @a c.
       *
       *  @note  This function is not overloaded on signed char and
       *         unsigned char.
      */
      __ostream_type& 
      put(char_type __c);

      // Core write functionality, without sentry.
      void
      _M_write(const char_type* __s, streamsize __n)
      {
	streamsize __put = this->rdbuf()->sputn(__s, __n);
	if (__put != __n)
	  this->setstate(ios_base::badbit);
      }


      __ostream_type& 
      write(const char_type* __s, streamsize __n);
      //@}


      __ostream_type& 
      flush();


      pos_type 
      tellp();

      __ostream_type& 
      seekp(pos_type);

       __ostream_type& 
      seekp(off_type, ios_base::seekdir);
      
    protected:
      explicit 
      basic_ostream() { }
    };

  template <typename _CharT, typename _Traits>
    class basic_ostream<_CharT, _Traits>::sentry
    {
      // Data Members:
      bool 				_M_ok;
      basic_ostream<_CharT,_Traits>& 	_M_os;
      
    public:
      explicit
      sentry(basic_ostream<_CharT,_Traits>& __os);

      /**
       *  @brief  Possibly flushes the stream.
       *
       *  If @c ios_base::unitbuf is set in @c os.flags(), and
       *  @c std::uncaught_exception() is true, the sentry destructor calls
       *  @c flush() on the output stream.
      */
      ~sentry()
      {
	// XXX MT
	if (_M_os.flags() & ios_base::unitbuf && !uncaught_exception())
	  {
	    // Can't call flush directly or else will get into recursive lock.
	    if (_M_os.rdbuf() && _M_os.rdbuf()->pubsync() == -1)
	      _M_os.setstate(ios_base::badbit);
	  }
      }

      operator bool() const
      { return _M_ok; }
    };

  template<typename _CharT, typename _Traits>
    basic_ostream<_CharT, _Traits>&
    operator<<(basic_ostream<_CharT, _Traits>& __out, _CharT __c);

  template<typename _CharT, typename _Traits>
    basic_ostream<_CharT, _Traits>&
    operator<<(basic_ostream<_CharT, _Traits>& __out, char __c)
    { return (__out << __out.widen(__c)); }

  // Specialization
  template <class _Traits> 
    basic_ostream<char, _Traits>&
    operator<<(basic_ostream<char, _Traits>& __out, char __c);

  // Signed and unsigned
  template<class _Traits>
    basic_ostream<char, _Traits>&
    operator<<(basic_ostream<char, _Traits>& __out, signed char __c)
    { return (__out << static_cast<char>(__c)); }
  
  template<class _Traits>
    basic_ostream<char, _Traits>&
    operator<<(basic_ostream<char, _Traits>& __out, unsigned char __c)
    { return (__out << static_cast<char>(__c)); }

  template<typename _CharT, typename _Traits>
    basic_ostream<_CharT, _Traits>&
    operator<<(basic_ostream<_CharT, _Traits>& __out, const _CharT* __s);

  template<typename _CharT, typename _Traits>
    basic_ostream<_CharT, _Traits> &
    operator<<(basic_ostream<_CharT, _Traits>& __out, const char* __s);

  // Partial specializationss
  template<class _Traits>
    basic_ostream<char, _Traits>&
    operator<<(basic_ostream<char, _Traits>& __out, const char* __s);
 
  // Signed and unsigned
  template<class _Traits>
    basic_ostream<char, _Traits>&
    operator<<(basic_ostream<char, _Traits>& __out, const signed char* __s)
    { return (__out << reinterpret_cast<const char*>(__s)); }

  template<class _Traits>
    basic_ostream<char, _Traits> &
    operator<<(basic_ostream<char, _Traits>& __out, const unsigned char* __s)
    { return (__out << reinterpret_cast<const char*>(__s)); }

  template<typename _CharT, typename _Traits>
    basic_ostream<_CharT, _Traits>& 
    endl(basic_ostream<_CharT, _Traits>& __os)
    { return flush(__os.put(__os.widen('\n'))); }

  template<typename _CharT, typename _Traits>
    basic_ostream<_CharT, _Traits>& 
    ends(basic_ostream<_CharT, _Traits>& __os)
    { return __os.put(_CharT()); }
  
  template<typename _CharT, typename _Traits>
    basic_ostream<_CharT, _Traits>& 
    flush(basic_ostream<_CharT, _Traits>& __os)
    { return __os.flush(); }

} // namespace std

#ifndef _GLIBCXX_EXPORT_TEMPLATE
# include <bits/ostream.tcc>
#endif

#endif	/* _GLIBCXX_OSTREAM */



  extern ostream std::cout;		///< Linked to standard output



using namespace std;

main()
{
	cout << "hi";
	getchar();
}
