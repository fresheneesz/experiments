using System;
using Android.App;
using Android.Content;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using Android.OS;

using System.Collections.Generic;

namespace HelloWorld
{
	[Activity (Label= "", MainLauncher = true, Theme = "@style/MainTheme", LaunchMode = Android.Content.PM.LaunchMode.SingleTop)]
	public class FirstActivity : Activity, GestureDetector.IOnGestureListener, GestureDetector.IOnDoubleTapListener
	{ 

		private GestureDetector _gestureDetector, listGesturesDetector;
		private TextView _textView;
		CustomListAdapter<string> aa;

		protected override void OnCreate(Bundle bundle)
		{
			base.OnCreate(bundle);
			
			SetContentView(Resource.Layout.Main);
			
			_textView = FindViewById<TextView>(Resource.Id.textView1);
			var compose = FindViewById(Resource.Id.compose);
			var enbox = FindViewById<ListView>(Resource.Id.enbox);

			aa = new CustomListAdapter<string>(this);
			enbox.SetAdapter(aa);
		
			var items = new string[] { "Vegetables","Fruits","Flower Buds","Legumes","Bulbs","Tubers", "awef","ef","FlowerefBuds","Legumes","Bulbs","Tubers" };
			foreach(string x in items) {
				aa.Add (x+"_");
			}

			compose.Click += (object sender, EventArgs e) =>  {
				StartActivity(typeof(Page2));
			};

			_gestureDetector = new GestureDetector(this);
			listGesturesDetector = new GestureDetector(new ListGestures(_textView));
		}

		public bool OnFling(MotionEvent e1, MotionEvent e2, float velocityX, float velocityY)
		{
			_textView.Text = String.Format("Fling velocity: {0} x {1}", velocityX, velocityY);
			return true;
		}

		public override bool OnTouchEvent(MotionEvent e)
		{
			_gestureDetector.OnTouchEvent(e);
			return false;
		}

		public bool OnDown(MotionEvent e)
		{
			_textView.Text = "ON Down";
			return false;
		}

		public void OnLongPress(MotionEvent e) 
		{
			_textView.Text = "ON Long press";
		}

		public bool OnScroll(MotionEvent e1, MotionEvent e2, float distanceX, float distanceY)
		{
			_textView.Text = String.Format("On Scroll with distance: {0} x {1}", distanceX, distanceY);
			return false;
		}

		public void OnShowPress(MotionEvent e) 
		{
		}

		public bool OnSingleTapUp(MotionEvent e)
		{
			//_textView.Text = "ON Tap Up";
			return false;
		}

		public bool OnSingleTapConfirmed (MotionEvent e)
		{
			_textView.Text = "ON Single Tap";
			return false;
		}
		public bool OnDoubleTap (MotionEvent e)
		{
			_textView.Text = "ON Double Tap";
			return false;
		}
		public bool OnDoubleTapEvent (MotionEvent e)
		{
			_textView.Text = "ON Double Tap Event";
			return false;
		}

		//Main Menu
		public override bool OnCreateOptionsMenu (IMenu menu)
		{
			//base.OnCreateOptionsMenu(menu);

			MenuInflater.Inflate (Resource.Menu.MainMenu, menu);

			return base.OnCreateOptionsMenu(menu);
		}

		public override bool OnOptionsItemSelected (IMenuItem item)
		{
			/*switch (item.ItemId) {

			}*/
			return true;
		}
	}

	public class CustomListAdapter<Type> : BaseAdapter<Type> {
		List<Type> items;
		Activity context;
		
		public CustomListAdapter(Activity context) : base()
		{
			this.context = context;
			this.items = new List<Type>();
		}
		public CustomListAdapter(Activity context, List<Type> items) : base()
		{
			this.context = context;
			this.items = items;
		}
		public override long GetItemId(int position)
		{
			return position;
		}
		public override Type this[int position]
		{
			get { return items[position]; }
		}
		public override int Count
		{
			get { return items.Count; }
		}
		public override View GetView(int position, View convertView, ViewGroup parent)
		{
			var item = items[position];
			View view = convertView;
			if (view == null) // no view to re-use, create new
				view = context.LayoutInflater.Inflate(Resource.Layout.EnboxListItem, null);
			/*view.FindViewById<TextView>(Resource.Id.Text1).Text = item.Heading;
			view.FindViewById<TextView>(Resource.Id.Text2).Text = item.SubHeading;
			view.FindViewById<ImageView>(Resource.Id.Image).SetImageResource(item.ImageResourceId);*/
			return view;
		}

		public void Add(Type item) {
			items.Add(item)
		}
	}



	public class ListGestures : Activity, GestureDetector.IOnGestureListener, GestureDetector.IOnDoubleTapListener
	{ 
		private TextView _textView;
		public ListGestures(TextView textView) {
			_textView = textView;
		}

		public bool OnFling(MotionEvent e1, MotionEvent e2, float velocityX, float velocityY)
		{
			//_textView.Text = String.Format("Fling velocity: {0} x {1}", velocityX, velocityY);
			return true;
		}

		public override bool OnTouchEvent(MotionEvent e)
		{
			//_gestureDetector.OnTouchEvent(e);
			return false;
		}

		public bool OnDown(MotionEvent e)
		{
			_textView.Text = "ON Down";
			return false;
		}

		public void OnLongPress(MotionEvent e) 
		{
			//_textView.Text = "ON Long press";
		}

		public bool OnScroll(MotionEvent e1, MotionEvent e2, float distanceX, float distanceY)
		{
			//_textView.Text = String.Format("On Scroll with distance: {0} x {1}", distanceX, distanceY);
			return false;
		}

		public void OnShowPress(MotionEvent e) 
		{
		}

		public bool OnSingleTapUp(MotionEvent e)
		{
			//_textView.Text = "ON Tap Up";
			return false;
		}

		public bool OnSingleTapConfirmed (MotionEvent e)
		{
			//_textView.Text = "ON Single Tap";
			return false;
		}
		public bool OnDoubleTap (MotionEvent e)
		{
			//_textView.Text = "ON Double Tap";
			return false;
		}
		public bool OnDoubleTapEvent (MotionEvent e)
		{
			//_textView.Text = "ON Double Tap Event";
			return false;
		}
	}
}