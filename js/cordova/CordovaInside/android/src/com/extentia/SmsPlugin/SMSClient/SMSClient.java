package com.extentia.SmsPlugin;

import java.util.Date;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.app.Activity;
import android.app.PendingIntent;
import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.telephony.SmsManager;
import android.util.Log;

/**
 * @date 18/06/2013
 * @author darshan.bhuwad
 * @description Inbox SMS import class
 */
public class SMSClient extends CordovaPlugin {

	private static final String TAG = "SMSClient";
	
	public long unixTimeStamp=0;
	public long unixToTimeStamp=0;
	public JSONArray recipients = null;
	public String message = null;
	public String phoneNumber =null;
	
	
	/**
	 * Adds all existing information to call back context,
	 * believe it is better this way, so that calling functions can use
	 * one source of information and also debug easier.
	 */
	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		Log.d(TAG,args.toString());
        JSONObject result = new JSONObject();
		InputValidator validator = new InputValidator(action,args,callbackContext,result);

		Log.v(TAG, "Inside execute method");

		if(action.equalsIgnoreCase("getByTimestamp"))
		{
			return validator.validate()?getByTimestamp(callbackContext, args, result):false;
		}
		else if(action.equalsIgnoreCase("getByTimestampAndByParticipant"))
		{
			return validator.validate()?getByTimestampAndByParticipant(callbackContext, args, result):false;
		}    
		else if(action.equalsIgnoreCase("sendMessage"))
		{
			return validator.validate()?sendMessage(callbackContext, args, result):false;
		}
		else if(action.equalsIgnoreCase("saveMessage"))
		{
			return validator.validate()?saveMessage(callbackContext,args, result):false;
		}
		else if(action.equalsIgnoreCase("setReadFlag"))
		{
			return validator.validate()?setReadFlag(callbackContext,args,result):false;
		}
        else
		{
			Log.e(TAG, "Exception : "+InputValidator.UKNOWN_ACTION_SUPPLIED);
			result.put("error", InputValidator.UKNOWN_ACTION_SUPPLIED);
			callbackContext.error(result);
			return false;
		}

	}

    /**
	 * @param callbackContext
	 * @param args
	 * @param result
	 * @return true/false
	 * @throws JSONException
	 * @Description: search SMS.
	 */
	private boolean search(CallbackContext callbackContext,JSONArray args,JSONObject result) throws JSONException 
	{
        
		//from:+918308357899,to:+919890938298,body:Inbox,read:1
        String searchString=args.getString(0);
        Log.d(TAG,"search string - "+searchString);
        String[] criterias=searchString.split(",");
        String queryString ="";
        String[] queryData=new String[criterias.length];
        int count=0;
        for (int i = 0; i < criterias.length; i++) {
        	String criteria=criterias[i];
        	String[] crt=criteria.split(":");
        	String key=crt[0];
        	String val=crt[1];
            queryString+=" and "+key+"=?";
            queryData[count]= (key.equalsIgnoreCase("body")?("%"+val+"%"):( key.equalsIgnoreCase("date") ? (Long.parseLong(val)*1000L)+"":val));
            count++;
        }
        queryString=queryString.replaceAll("body=", "body like ");
        queryString=queryString.replaceFirst("and", "");
        queryString=queryString.replace("date=", "date=>");
        Log.d(TAG,"queryString - "+queryString);
       
        String queryDataString="";
        for (int i = 0; i < queryData.length; i++) {
        	queryDataString+=","+queryData[i];
		}
        queryDataString=queryDataString.replaceFirst(",", "");
        Log.d(TAG,"queryDataString - "+queryDataString);
        
		JSONArray readResultsArray=readTextsByQuery(queryString ,queryData,"search");
		result.put("results", readResultsArray);
		callbackContext.success(result);

		return true;


	}
	


	/**
	 * @param callbackContext
	 * @param args
	 * @param result
	 * @return true/false
	 * @throws JSONException
	 * @Description: Returns SMSs by particular timestamp.
	 */
	private boolean getByTimestamp(CallbackContext callbackContext,JSONArray args,JSONObject result) throws JSONException 
	{

		String queryString = "date<=? AND date>=?";
		String[] queryData = null;
		
		unixTimeStamp=Math.abs(args.getLong(0)*1000L);
		unixToTimeStamp=Math.abs(args.getLong(1)*1000L);

		if (unixTimeStamp < unixToTimeStamp)		
		{
			queryData = new String[] { String.valueOf(unixToTimeStamp), String.valueOf(unixTimeStamp) };
		}
		else
		{
			queryData = new String[] { String.valueOf(unixTimeStamp), String.valueOf(unixToTimeStamp) };
		}

		JSONArray readResultsArray=readTextsByQuery(queryString ,queryData,"getByTimestamp");
		result.put("results", readResultsArray);
		callbackContext.success(result);
        Log.d(TAG,result.toString());
		return true;


	}

	/**
	 * @date 27-6-2013
	 * @param callbackContext
	 * @param args
	 * @param result
	 * @return true/false
	 * @throws JSONException
	 * @description Returns SMSs before particular timestamp.
	 */

	private boolean getByTimestampAndByParticipant( CallbackContext callbackContext,JSONArray args, JSONObject result) throws JSONException 
	{
		unixTimeStamp=Math.abs(args.getLong(1)*1000L);
		unixToTimeStamp=Math.abs(args.getLong(2)*1000L);
		
		phoneNumber = args.getString(0);         //get the phoneNumber

		String queryString = " (address=? AND date<=? AND date>=?) OR (type=? AND date<=? AND date>=?)";
		String[] queryData = null;
		if (unixTimeStamp < unixToTimeStamp)		
		{
			queryData = new String[] { phoneNumber, String.valueOf(unixToTimeStamp) , String.valueOf(unixTimeStamp),"3", String.valueOf(unixToTimeStamp) , String.valueOf(unixTimeStamp)};
		}
		else
		{
			queryData = new String[] { phoneNumber , String.valueOf(unixTimeStamp), String.valueOf(unixToTimeStamp),"3", String.valueOf(unixTimeStamp), String.valueOf(unixToTimeStamp)};
		}

		JSONArray readResultsArray=readTextsByQuery(queryString ,queryData,"getByTimestampAndByParticipant");
		result.put("from",phoneNumber);
		result.put("results", readResultsArray);
		callbackContext.success(result);
        Log.d(TAG,result.toString());
		return true;


	}

	/**
	 * @date 18-6-2013
	 * @param queryString
	 * @param queryData
	 * @return List
	 * @throws JSONException
	 * @description fetch SMSs after particular timestamp for the given phone number address from device inbox.
	 */
	private JSONArray readTextsByQuery(String queryString ,String[] queryData, String callerMethod) throws JSONException 
	{
		ContentResolver contentResolver = cordova.getActivity().getContentResolver();
		String sortOrder = "date DESC";
		Cursor c = contentResolver.query(Uri.parse("content://sms"), null,queryString, queryData, sortOrder);
        return collectSMSList(c, callerMethod);
	}

	/**
	 * @date 20-6-2013
	 * @param c
	 * @param callerMethod
	 * @return JSONArray
	 * @Description Collecting the data from Cursor
	 */
	private JSONArray collectSMSList(Cursor c, String callerMethod)
	{
		JSONArray array = new JSONArray();
		if(c.getCount()>0) 
		{
			while(c.moveToNext()) 
			{
				try{
					
					SMSData sms = new SMSData();

					String type = c.getString(c.getColumnIndexOrThrow("type"));
					String address = c.getString(c.getColumnIndexOrThrow("address"));
					long date = c.getLong(c.getColumnIndexOrThrow("date"));
					long date_sent = c.getLong(c.getColumnIndexOrThrow("date_sent"));
					String body = c.getString(c.getColumnIndexOrThrow("body"));
					int read = c.getInt(c.getColumnIndexOrThrow("read"));
					String threadid = c.getString(c.getColumnIndexOrThrow("thread_id"));

 
					Log.d(TAG, "type : "+type);
					Log.d(TAG, "address : "+address);
					Log.d(TAG, "date : "+date);
					Log.d(TAG, "date_sent : "+date_sent);
					Log.d(TAG, "body : "+body);
					Log.d(TAG, "read : "+read);
					Log.d(TAG, "thread_id : "+threadid);
					

                    String[] addressarray = new String[1];
					addressarray[0] = address;

					if (type.contains("1")) {        //inbox
						String[] blankto = new String[0];
						if(!callerMethod.equalsIgnoreCase("getByTimestampAndByParticipant"))    //for specific participant, from is common and hence outside main data array.
							sms.setFrom(address);
						sms.setTo(blankto);
						sms.setReceived_date(date/1000L); //@from-dawid: I suppouse this should be type casted to int in other places as well
						sms.setSent_date(date_sent/1000L); //-1
						sms.setBody(body.toString());
						sms.setRead_flag(read);            
					}  else if (type.contains("2")) {        //sent        //sent

						if(!callerMethod.equalsIgnoreCase("getByTimestampAndByParticipant"))
							sms.setFrom("");            //keep it blank for the sent msgs.
						sms.setTo(addressarray);
						sms.setReceived_date(date_sent/1000L) ;
						sms.setSent_date(date/1000L);
						sms.setBody(body.toString());
						sms.setRead_flag(read);                
					}else if (type.contains("3")) { //draft

						boolean include= false;

						String[] recipients = null;
						try{
							Activity act = cordova.getActivity();
							Cursor cur1= act.getContentResolver().query(Uri.parse("content://mms-sms/conversations?simple=true"), null, "_id ="+threadid ,null,null);
							act.startManagingCursor(cur1);
							while(cur1.moveToNext())
							{
								String  recipientsId = cur1.getString(cur1.getColumnIndexOrThrow("recipient_ids")).toString();
								Log.i(TAG,"found ids : "+recipientsId);

								String[] recipientIds = recipientsId.split(" ");
								recipients = new String[recipientIds.length];
								int count=0;
								for (int i = 0; i < recipientIds.length; i++) {
									String recipientId=recipientIds[i];

									Log.i(TAG,"getting number from id : "+recipientId);
									Cursor cur2=  act.getContentResolver().query(Uri.parse("content://mms-sms/canonical-addresses"), null, "_id = " + recipientId, null, null);
									act.startManagingCursor(cur2);

									String foundNumber = "";
									while(cur2.moveToNext())
									{
										foundNumber = cur2.getString(cur2.getColumnIndexOrThrow("address")).toString();
										Log.i(TAG,"found Number : "+count+". "+foundNumber);

										if(callerMethod.equalsIgnoreCase("getByTimestamp") || (callerMethod.equalsIgnoreCase("getByTimestampAndByParticipant") && foundNumber.contains(phoneNumber))){
											include=true;
										}
									}
									recipients[count++]=foundNumber;
									cur2.close();
								} 
							}
							cur1.close();
						}catch(Exception e){
							Log.e(TAG,"Exception : "+e.getMessage());
						}

						if(include){
                            sms.setFrom(address);
							sms.setTo(recipients);
							sms.setReceived_date(date_sent/1000L) ;
							sms.setSent_date(date/1000L);
							sms.setBody(body.toString());
						}
					} 
					array.put(sms.getJSON());
					Log.d(TAG, "------------------------------------");
				}catch(Exception e){
					Log.e(TAG,"Outer Exception : "+e.getMessage()+" - Cause : "+e.getCause());
					Log.e(TAG,"Outer Exception : "+e.getCause());
				}
			}
		}
		c.close();
		return array;
	}

	/**
	 * 
	 * @param phoneNumbers
	 * @param message
	 * @return
	 * @throws JSONException 
	 */

	private String sendSMS(JSONArray phoneNumbers, String message) throws JSONException {

		try 
		{
			int recipientlength = phoneNumbers.length();
			for (int i = 0; i < recipientlength; i++) 
			{
				String recipient = phoneNumbers.getString(i);
				SmsManager manager = SmsManager.getDefault();
				PendingIntent sentIntent = PendingIntent.getActivity(cordova.getActivity().getApplicationContext(), 0, new Intent(), 0);
				// sending sms
				manager.sendTextMessage(recipient, null, message, sentIntent, null);
				ContentValues values = new ContentValues(); 
				values.put("address", recipient);
				values.put("body", message); 
				ContentResolver contentResolver = cordova.getActivity().getContentResolver();
				contentResolver.insert(Uri.parse("content://sms/sent"), values);
			}
		} 
		catch (Exception exp) 
		{
			return String.format(InputValidator.ERROR_SENDING_MESSAGE, exp);
		}
		return "";
	}




	/**
	 * @date: 18-6-2013
	 * @param callbackContext
	 * @param args
	 * @param result
	 * @return true/false
	 * @throws JSONException
	 * @Description: Returns all SMS (with search term if provided)
	 */
	private boolean sendMessage( CallbackContext callbackContext,JSONArray args,JSONObject result) throws JSONException 
	{
		recipients = args.getJSONArray(1);
		message = args.getString(0);
		
		if(!sendSMS(recipients, message).equalsIgnoreCase(""))
		{
			return false;
		}
		else    
		{
			JSONArray readResultsArray = new JSONArray();
			JSONObject obj = new JSONObject();
			try{
				obj.put("from" , "" );
				obj.put("body" , message );
				obj.put("received_date" , 0 );
				obj.put("sent_date" , new Date().getTime()/1000L );
				obj.put("read_flag" , 0 );
				obj.put("to" , recipients );
			}catch(JSONException e){
				e.printStackTrace();
			}	
			readResultsArray.put(obj);

			result.put("results", readResultsArray);
			callbackContext.success(result);
			return true;

		}
	}

	/**
	 * @date: 29-7-2013
	 * @param callbackContext
	 * @param result
	 * @param address
	 * @throws subject
	 * @throws date
	 * @throws thread_id
	 * @Description: Saves text as a draft  
	 */
	public boolean saveMessage(CallbackContext callbackContext,JSONArray args,JSONObject result) throws JSONException{

		String body=args.getString(0);
		recipients = args.getJSONArray(1);
		Long date=System.currentTimeMillis();
		String thread_id=getThreadId(recipients);
		String address=recipients.get(0).toString();
		long threadId = Long.parseLong(thread_id);
		
		ContentValues contentValue = new ContentValues(5);
		contentValue.put("address", address);
		if (date != null) {
			contentValue.put("date", String.valueOf(date));
		}
		contentValue.put("read", Integer.valueOf(1));
		contentValue.put("body", body);
		contentValue.put("type",3);
		if (threadId != -1L) {
			contentValue.put("thread_id", threadId);
		}
		cordova.getActivity().getContentResolver().insert(Uri.parse("content://sms/draft") , contentValue) ;
        Log.e(TAG, "Successfully Saved");
		result.put("results", "[\"Successfully Saved\"]");
		callbackContext.success(result);
		return true;  
	}


	/**
	 * @date: 29-7-2013
	 * @param recipients
	 * @throws JSONException 
	 * @Description: Get thread id from participants array 
	 */
	private String getThreadId(JSONArray recipients) throws JSONException {

		Uri.Builder builder = Uri.parse("content://mms-sms/threadID").buildUpon();
		if (recipients != null) { 
			int len = recipients.length();
			for (int i=0;i<len;i++){ 
				builder.appendQueryParameter("recipient",recipients.get(i).toString());
			} 
		}
		
		Uri uri = builder.build();

		String threadId = "0";
		Cursor cursor = cordova.getActivity().getContentResolver().query(uri, new String[] { "_id" },null, null, null);
		if (cursor != null) {
			try {
				if (cursor.moveToFirst()) {
					threadId = cursor.getString(0) ;
				}
			} finally {
				cursor.close();
			}
		}
		return threadId;
	}

    /**
	 * @date: 31-7-2013
	 * @param callbackContext
     * @param result
     * @param args
     * @return boolean
	 * @Description: search a message and set/reset Read Flag
	 */
	private boolean setReadFlag(CallbackContext callbackContext,JSONArray args,JSONObject result) throws JSONException{
		
		Log.d(TAG, "Inside Set Read Flag ");      
		try{
			phoneNumber=args.getString(0);
			message=args.getString(1);
			int toggleRead=args.getInt(2);
			
			Cursor cursor = cordova.getActivity().getContentResolver().query(Uri.parse("content://sms/inbox"), null, null, null, null);
			boolean sent=false;
			while (cursor.moveToNext()) {
				if ( (cursor.getString(cursor.getColumnIndex("address")).equals(phoneNumber))  && cursor.getString(cursor.getColumnIndex("body")).startsWith(message) ) {

					Log.d(TAG,"Found a message to mark ");
					String msgId = cursor.getString(cursor.getColumnIndex("_id"));

					ContentValues values = new ContentValues();
					values.put("read", toggleRead==0?true:false);

					cordova.getActivity().getContentResolver().update(Uri.parse("content://sms/inbox"), values, "_id=" + msgId, null);
					sent=true;
				}
			}

			if(sent){
					Log.e(TAG, "Successfully Updated Read Flag.");
					result.put("results", "[\"Successfully Updated Read Flag.\"]");
					callbackContext.success(result);
					return true;
			}else{
					Log.e(TAG, "Error : Message Not Found!");
					result.put("error", "Error Updating Read Flag : Message Not Found!");
					callbackContext.error(result);
					return false;
			}

		}catch(Exception e)
		{
			Log.e(TAG, "Error : "+e.toString());
			result.put("error", "Error Updating Read Flag.");
			callbackContext.error(result);
			return false;
		}
	}


}