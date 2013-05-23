<?php

class A {
	static $x=4;

	static function hi() {
		return static::$x;
	}

	protected static function memberIsDefinedIn($methodName)
	{	$reflect = new ReflectionClass(get_called_class());
		if( $reflect->hasProperty($methodName) ) {
			return true;
		} else {
			return false;
		}
	}
}

class B extends A {
	static function gah() {
		if(self::memberIsDefinedIn('x')) {
			return static::$x;
		} else {
			throw new Exception("fail");
		}
	}
}

var_dump(B::gah());


		$fp = fopen('php://stdin', 'r');
	fgets($fp, 2);