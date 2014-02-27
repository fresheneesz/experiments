using System;
using Android.App;
using Android.Content;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using Android.OS;


namespace HelloWorld
{
	[Activity (Label= "Page2", Theme = "@style/MainTheme", LaunchMode = Android.Content.PM.LaunchMode.SingleTop)]
	public class Page2 : Activity
	{ 
		protected override void OnCreate(Bundle bundle)
		{
			base.OnCreate(bundle);
			
			SetContentView(Resource.Layout.Page2);

		}

		//Main Menu
		public override bool OnCreateOptionsMenu (IMenu menu)
		{
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
}