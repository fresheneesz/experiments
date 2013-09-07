package com.extentia.SmsPlugin;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
/**
 * This class represents SMS.
 */

public class SMSData {
    
	// Number from witch the sms was send
	private String from;
	// Number to witch the sms was send
	private String tos[];
	// SMS text body
	private String body;
	private long received_date;
	private long sent_date;
	private int read_flag; 
    
	
    JSONObject obj = new JSONObject();

	public String getFrom() {
		return from;
	}
	
	public void setFrom(String from) {
		this.from = from;
	}
	
	public String[] getTo() {
		return tos;
	}
	
	public void setTo(String tos[]) {
		this.tos = tos;
	}
	
	public String getBody() {
		return body;
	}
	
	public void setBody(String body) {
		this.body = body;
	}

	/**
	 * @return the received_date
	 */
	public long getReceived_date() {
		return received_date;
	}

	/**
	 * @param received_date the received_date to set
	 */
	public void setReceived_date(long received_date) {
		if(received_date==0){received_date=-1;}
		this.received_date = received_date;
	}

	/**
	 * @return the sent_date
	 */
	public long getSent_date() {
		return sent_date;
	}

	/**
	 * @param sent_date the sent_date to set
	 */
	public void setSent_date(long sent_date) {
		if(sent_date==0){sent_date=-1;}
		this.sent_date = sent_date;
	}

	/**
	 * @return the read_flag
	 */
	public int getRead_flag() {
		return read_flag;
	}

	/**
	 * @param read_flag the read_flag to set
	 */
	public void setRead_flag(int read_flag) {
		this.read_flag = read_flag;
	}

    
    /**
	 * @date 29-7-2013
	 * @return String
	 * @description Returns JSON string of the bean object data.
	 */
    @Override
	public String toString() {
       return obj.toString();
	}

    /**
	 * @date 29-7-2013
	 * @return JSONObject
	 * @description Returns JSON object of the bean object.
	 */
	public JSONObject getJSON() {

        JSONArray arr = new JSONArray();
        for (int i = 0; i < tos.length; i++) {
			arr.put(tos[i]);
		}
       
       
        try{
            obj.put("from" , from );
            obj.put("body" , body );
            obj.put("received_date" , received_date );
            obj.put("sent_date" , sent_date );
            obj.put("read_flag" , read_flag );
            obj.put("to" , arr );
	   }catch(JSONException e){
            e.printStackTrace();
       }	

        return obj;
	}
}
