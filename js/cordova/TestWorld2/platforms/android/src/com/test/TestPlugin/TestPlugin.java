package com.test;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.util.Log;

/**
 * @date 18/06/2013
 * @author darshan.bhuwad
 * @description Inbox SMS import class
 */
public class TestPlugin extends CordovaPlugin {

	@Override public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        Log.v("test", "Inside execute method");
		
		JSONObject result = new JSONObject();
		if(action.equals("test")) {
			result.put("success", true);
			callbackContext.success(result);			
			return true;
		} else {
			Log.e("wut", "OMG!?");
			result.put("error", "OHNOZ!");
			callbackContext.error(result);
			return false;
		}
	}
}
