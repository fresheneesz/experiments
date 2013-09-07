package com.test.CordovaInside2;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import android.content.Context;
import android.os.Bundle;
import android.util.AttributeSet;
import org.apache.cordova.*;
import org.apache.cordova.CordovaInterface;

public class MainActivity extends CordovaActivity implements CordovaInterface {
    CordovaWebView webview1, webview2;

    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);

        //webview1 = (CordovaWebView) findViewById(R.id.webview1);
        //webview1.loadUrl("file:///android_asset/www/index.html");

        webview2 = (CordovaWebView) findViewById(R.id.webview2);
        webview2.loadUrl("file:///android_asset/www/index2.html");
    }

    private final ExecutorService threadPool = Executors.newCachedThreadPool();
    public ExecutorService getThreadPool() {
        return threadPool;
    }

}
