package com.extentia.SmsPlugin;

import java.util.Hashtable;

/**
 * 
 * @author Madhukar.Garg
 * @from-dawid: generally speaking this class is totally useless
 * its purpouse is maybe obvious but there are much simpler solution
 * than using this class
 */
public class ActionParser {
	
	public enum Action { 
		ACTION_GET_MESSAGE, 
		ACTION_GET_MESSAGE_BY_TMP,
		ACTION_GET_MESSAGE_BY_TMP_BY_NUMBER, 
        ACTION_SEND_SMS
	};
	
	// FROM @valerie "do we need actionEmailCall?"
	// it doesnt seem to be used and this is a class for the SMS not Email plugin
	Hashtable<String, Action> actionEmailCall = new Hashtable<String, Action>();
	Hashtable<String, Action> actionSMSCall = new Hashtable<String, Action>();
	
	public ActionParser(){
    	actionSMSCall.put("GetMessage",Action.ACTION_GET_MESSAGE);
    	actionSMSCall.put("getByTimestamp",Action.ACTION_GET_MESSAGE_BY_TMP);
    	actionSMSCall.put("getByTimestampAndByParticipant",Action.ACTION_GET_MESSAGE_BY_TMP_BY_NUMBER);
    	actionSMSCall.put("sendMessage",Action.ACTION_SEND_SMS);
	}
	
	/**
	 * @desc method defined to return action to SMS class
	 * @param action
	 * @return
	 */
	public Action returnSMSAction(String action) 
	{
		//return this.actionEmailCall.get(action);
		Action returnaction = null;
		if (actionSMSCall.containsKey(action))
	    {
			returnaction = actionSMSCall.get(action);
	    }
		else
		{
			// FROM @valerie "returnaction is already null on line 39"
			returnaction = null;
		}
		return returnaction;
		
		// FROM @valerie I would suggest to shorten the code above with this 2 lines below
		/* 
		Action returnaction = actionSMSCall.containsKey(action) ? actionSMSCall.get(action) : null;
		return returnaction;
		*/
	}
	
}	// end of class