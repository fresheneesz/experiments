package com.extentia.SmsPlugin;

import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.util.Log;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class InputValidator
{
	private static final String TAG = "SMSClient";

	public final static String ERROR_ARGUMENT_COUNT_MISMATCH =  "Incorrect number of Parameters passed. Expected parameters:%d";
	public final static String ERROR_ARGUMENT_EMPTY =  "Parameter should not be empty.";
	public final static String ERROR_TIMESTAMP_EMPTY =  "Time Stamp provided is empty.";
	public final static String ERROR_TIMESTAMP_NOT_NUMERIC = "Time Stamp provided is not numeric: %s";
	public final static String ERROR_TIMESTAMP_ZERO = "Time Stamp provided can not be 0.";
	public final static String UKNOWN_ACTION_SUPPLIED = "Action supplied is not supported from this plugin.";
	public final static String MESSAGE_EMPTY = "Parameter message should not be empty.";

	public final static String SEND_RECIPIENS_EMPTY = "Parameter recipients should not be empty";
	public final static String ERROR_INVALID_PHONENUMER="Phone Number should be max 14 digit long including '+' sign.";
	public final static String ERROR_INVALID_PHONENUMER_BLANK="Phone Number can not be blank.";
	public final static String ERROR_INVALID_PHONENUMER_PLUS="Phone Number can contain '+' sign only at the start.";
	public final static String ERROR_INVALID_PHONENUMER_SPECIAL="Phone Number can not contain special characters excluding '+' sign.";
	public final static String ERROR_INVALID_PHONENUMER_START="Phone Number should start with '+' sign.";
	public final static String ERROR_SENDING_MESSAGE="Error while sending sms: %s";

	private String action; 
	private JSONArray args; 
	private CallbackContext callbackContext;
	public JSONObject result = new JSONObject();
	private String errorString = "";

	public InputValidator(String action, JSONArray args, CallbackContext callbackContext, JSONObject result){
		this.action=action;
		this.args=args;
		this.callbackContext=callbackContext;
		this.result=result;
	}

    public InputValidator(){}

	/** @desc validate all methods depending upon action
	 * @return boolean
	 */
	public boolean validate() throws JSONException  {

		this.errorString = "";
        Log.d(TAG,action);
		if(action.equalsIgnoreCase("getByTimestamp"))
		{
			if (!(validateArgumentsCount(args, 2) && validateTimeStamp(args.getString(0),0) && validateTimeStamp(args.getString(1),1) ))
			{
				return (returnOnErrorWithMessage());
			}
		}else if(action.equalsIgnoreCase("getByTimestampAndByParticipant"))
		{
			if (!(validateArgumentsCount(args, 3) && validateJSONArrayOfPhoneNos(new JSONArray("['"+args.getString(0)+"']"),0, action)  && validateTimeStamp(args.getString(1),1) && validateTimeStamp(args.getString(2),2)))
			{
				return (returnOnErrorWithMessage());
			}
		}else if(action.equalsIgnoreCase("sendMessage"))
		{
			if ( !(validateArgumentsCount(args, 2) && validateMessage(args.getString(0),0) && validateJSONArrayOfPhoneNos(args.getJSONArray(1),1, action) ) )
			{
				return (returnOnErrorWithMessage());
			}
        }else if(action.equalsIgnoreCase("saveMessage"))
		{
        	if ( !( validateArgumentsCount(args, 2) && validateMessage(args.getString(0),0) && validateJSONArrayOfPhoneNos(args.getJSONArray(1),1,action) ) )
    		{
				return (returnOnErrorWithMessage());
			}
		}else if(action.equalsIgnoreCase("setReadFlag"))
		{
			if ( !( validateArgumentsCount(args, 3) && validateJSONArrayOfPhoneNos(new JSONArray("['"+args.getString(0)+"']"),0, action) && validateMessage(args.getString(1),1) &&  isNumeric(args.getString(2),2)) )
    		{
				return (returnOnErrorWithMessage());
			}
		}
        
		return true;
	}

	/** @desc validate Message
	 * @param body
	 * @param number
	 * @return boolean
	 */
	private boolean validateMessage(String body,int number)   {
        String error="";
	    boolean valid=true;
	    if(error.equalsIgnoreCase("")){
		  error=(body.equalsIgnoreCase("")?"Argument "+number+" can not be blank":"");
		  valid=error.equalsIgnoreCase("")?true:false;
	    } 
	    this.errorString = error;
	    return valid;
	}

	/** @desc validate JSON Array
	 * @param array
	 * @param number
	 * @param action 
	 * @return boolean
	 */
	private boolean validateJSONArrayOfPhoneNos(JSONArray array,int number, String action) throws JSONException {
		String error="";
		boolean valid=true;
		if(error.equalsIgnoreCase("")){
			error=(array==null?"Argument "+number+" can not be null":"");
			valid=error.equalsIgnoreCase("")?true:false;
		} if(error.equalsIgnoreCase("")){
			if(!action.equalsIgnoreCase("saveMessage")){
				error=(array.length() <= 0?InputValidator.SEND_RECIPIENS_EMPTY:"");
				valid=error.equalsIgnoreCase("")?true:false;
			}
		} if(error.equalsIgnoreCase("")){
			error=checkRecipientValidity(array); // Check phone numbers array
			valid=error.equalsIgnoreCase("")?true:false;
		}
		this.errorString = error;
		return valid;
	}


	/** @desc validate time stamp
	 * @param timestamp
	 * @param i 
	 * @return String
	 */
	public boolean validateTimeStamp(String timestamp, int i)
	{
		String error="";
		boolean valid=true;
		if(error.equalsIgnoreCase("")){
			error= timestamp.equalsIgnoreCase("")?"Argument "+i+" Can not be blank":"";
			valid=error.equalsIgnoreCase("")?true:false;
		} if(error.equalsIgnoreCase("")){
			error=isNumeric(timestamp,i)?"":"Argument "+i+" Should be a number";
			valid=error.equalsIgnoreCase("")?true:false;
		} if(error.equalsIgnoreCase("")){
			error=timestamp.equalsIgnoreCase("0")?"Argument "+i+" Can not be 0":"";
			valid=error.equalsIgnoreCase("")?true:false;
		}
		this.errorString = error;
		return valid;
	}

	/** @desc validate Arguments Count
	 * @param args
	 * @param expectedcount
	 * @return String
	 */
	public boolean validateArgumentsCount(JSONArray args, int expectedcount)
	{
		String errorString = "";
		boolean noError = true;
		if (args.length() != expectedcount)
		{
			errorString = String.format(ERROR_ARGUMENT_COUNT_MISMATCH, expectedcount);
			noError=false;
		}
		else
		{
			boolean allNull = false;
			for (int i = 0; i < args.length(); i++) {
				String param="";
				try {
					param = args.getString(i);
				} catch (JSONException e) {
					e.printStackTrace();
				}
				if (param.equals("null") || param.equals(""))
				{
					allNull = true;
					break;
				}
			}
			if (allNull)
			{
				errorString = String.format(ERROR_ARGUMENT_EMPTY);
				noError = false;
			}
		}
		this.errorString = errorString;
		return noError;
	}

	/**
	 * @param inputData
	 * @param number
	 * @return boolean
	 */
	public boolean isNumeric(String inputData,int number) {
		boolean valid=inputData.matches("[-+]?\\d+(\\.\\d+)?")?true:false;
		if(!valid){
			this.errorString = "Argument "+number+" is not a valid number";
			return false;
		}else{
			return true;
		}
	}


	/**
	 * @param phoneNumber
	 * @param number
	 * @return String
	 * @desc Validates phone number
	 */
	public String isValidPhoneNumber(String phoneNumber,int number) {

        String regex = "^\\+?[0-9. ()-]{10,25}$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(phoneNumber);
 
        if (!matcher.matches()) {
            return "Phone Number must be in the form XXX-XXXXXXX";
        } 

        return "";
    }

	 

	/**
	 * 
	 * @param phoneNumbers
	 * @throws JSONException 
	 * @return string
	 * @desc checks Recipient's Validity
	 */
	public String checkRecipientValidity(JSONArray phoneNumbers) throws JSONException {
		int recipientlength = phoneNumbers.length();

		// if recipient exists
		if(recipientlength>0) {
			for (int i = 0; i < recipientlength; i++) 
			{
				String recipient = phoneNumbers.getString(i);
				String validationMessage = isValidPhoneNumber(recipient,i);
				if(!validationMessage.equalsIgnoreCase(""))
				{ 
					return validationMessage;
				}
			}
		}
		return "";
	}


	/**
	 * @date: 25-7-2013
	 * @param callbackContext
	 * @param result
	 * @param argumentsErrorString
	 * @throws JSONException
	 * @Description: Returns the error string with error callback method  
	 */
	public boolean returnOnErrorWithMessage() throws JSONException{

		if (!(this.errorString.equalsIgnoreCase("")))
		{
			Log.e(TAG,"Error : "+errorString);
			result.put("error",errorString);
			callbackContext.error(result);
			return false;
		}else{
			Log.e(TAG,"Success ");
			return true;
		}
	}
}