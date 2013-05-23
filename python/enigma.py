def isPrime(x):
	for n in range(2, x):
		if (float(x)/n)%1 == 0:
			return False
	return True
	
to_19 = ( 'zero',  'one',   'two',  'three', 'four',   'five',   'six',
          'seven', 'eight', 'nine', 'ten',   'eleven', 'twelve', 'thirteen',
          'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen' )
tens  = ( 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety')
denom = ( '',
          'thousand',     'million',         'billion',       'trillion',       'quadrillion',
          'quintillion',  'sextillion',      'septillion',    'octillion',      'nonillion',
          'decillion',    'undecillion',     'duodecillion',  'tredecillion',   'quattuordecillion',
          'sexdecillion', 'septendecillion', 'octodecillion', 'novemdecillion', 'vigintillion' )

# convert a value < 100 to English.
def _convert_nn(val):
    if val < 20:
        return to_19[val]
    for (dcap, dval) in ((k, 20 + (10 * v)) for (v, k) in enumerate(tens)):
        if dval + 10 > val:
            if val % 10:
                return dcap + '-' + to_19[val % 10]
            return dcap

# convert a value < 1000 to english, special cased because it is the level that kicks 
# off the < 100 special case.  The rest are more general.  This also allows you to
# get strings in the form of 'forty-five hundred' if called directly.
def _convert_nnn(val):
    word = ''
    (mod, rem) = (val % 100, val // 100)
    if rem > 0:
        word = to_19[rem] + ' hundred'
        if mod > 0:
            word = word + ' '
    if mod > 0:
        word = word + _convert_nn(mod)
    return word

def englishNumber(val):
    if val < 100:
        return _convert_nn(val)
    if val < 1000:
         return _convert_nnn(val)
    for (didx, dval) in ((v - 1, 1000 ** v) for v in range(len(denom))):
        if dval > val:
            mod = 1000 ** didx
            l = val // mod
            r = val - (l * mod)
            ret = _convert_nnn(l) + ' ' + denom[didx]
            if r > 0:
                ret = ret + ', ' + englishNumber(r)
            return ret

def lrange(firstLetter = 'a', lastLetter = 'z'):
        """
                lrange([firstLetter], [lastLetter]), returns a tuple 
                representing the range of the letters in the alphabet.
                You can change the letters to represent your desired idiom.
                If you want to change from tuple to list, just change the
                parentheses to square brackets.
        """
        letters = ('a','b','c','d','e','f','g','h','i','j','k','l','m','n',
                                'o','p','q','r','s','t','u','v','w','x','y','z')
        firstIndex = letters.index(firstLetter)
        lastIndex = letters.index(lastLetter) + 1
        return letters[firstIndex:lastIndex]

def countLetters(x):
	count = 0
	for n in range(0, len(x)):		
		if(str(x)[n] in lrange('a','z')):
			count += 1
	return count


for n in range(10, 10000):
	firstPossiblePrime = countLetters(englishNumber(n))
	otherPossiblePrime = float(n)/firstPossiblePrime
	if otherPossiblePrime % 1 == 0:
		otherPossiblePrime = int(otherPossiblePrime)
	else:
		continue
	if isPrime(firstPossiblePrime) and isPrime(otherPossiblePrime):
		print('We\'ve got one: '+str(n)+' primes being: '+str(firstPossiblePrime)+' and '+str(otherPossiblePrime))


raw_input()
