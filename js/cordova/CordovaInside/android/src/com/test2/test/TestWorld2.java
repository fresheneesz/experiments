/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.test2.test;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import android.os.Bundle;
import org.apache.cordova.*;
import org.apache.cordova.CordovaInterface;
import android.app.Activity;


public class TestWorld2 extends CordovaActivity implements CordovaInterface { // DroidGap { //
    CordovaWebView cwv;


    //@Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        // Set by <content src="index.html" /> in config.xml
        //super.loadUrl(Config.getStartUrl());

        /*detailListView = (LinearLayout) findViewById(R.id.DetailsLinearLayout); // Find the layout where you want to add button
        Button button = new Button(this);
        button.setLayoutParams(new LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT,ViewGroup.LayoutParams.WRAP_CONTENT));
        detailListView.addView(button);//add view to add



        cwv = (CordovaWebView) findViewById(R.id.tutorialView);
        Config.init(this);
        cwv.loadUrl(Config.getStartUrl());  */
    }

    private final ExecutorService threadPool = Executors.newCachedThreadPool();
    public ExecutorService getThreadPool() {
        return threadPool;
    }


}

