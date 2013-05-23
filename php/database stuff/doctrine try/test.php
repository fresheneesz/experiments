<?php

//echo phpinfo();exit;

require_once("Doctrine.php");
//spl_autoload_register(array('Doctrine', 'autoload'));
//$manager = Doctrine_Manager::getInstance();

spl_autoload_register(array('Doctrine', 'autoload'));
$manager = Doctrine_Manager::getInstance();

$conn = Doctrine_Manager::connection('sqlite::memory:', 'doctrine');

$manager->setAttribute(Doctrine::ATTR_VALIDATE, Doctrine::VALIDATE_ALL);
$manager->setAttribute(Doctrine::ATTR_EXPORT, Doctrine::EXPORT_ALL);
$manager->setAttribute(Doctrine::ATTR_MODEL_LOADING, Doctrine::MODEL_LOADING_CONSERVATIVE);

//echo Doctrine::getPath();exit;

$dsn = "mysql:dbname=tetrudco_sqltest;host=localhost";
$user="tetrudco_freshen";
$password="Frenchy189AoP9&^";

$dbh = new PDO($dsn, $user, $password);
$conn = Doctrine_Manager::connection($dbh);
$conn->setOption('username', $user);
$conn->setOption('password', $password);

//$conn->execute('SHOW TABLES');exit;

/*
//$conn->export->createTable('test', array('name' => array('type' => 'string')));
$conn->execute('INSERT INTO test (name) VALUES (?)', array('jwage'));

$stmt = $conn->prepare('SELECT * FROM test');
$stmt->execute();
$results = $stmt->fetchAll();
print_r($results);

exit;
*/

echo $manager->getConnectionName($conn);
exit;

//$conn->export->createTable('test', array('name' => array('type' => 'string')));
//$conn->execute('INSERT INTO test (name) VALUES (?)', array('jwage'));

//$stmt = $conn->prepare('SELECT * FROM test');
//$stmt->execute();
//$results = $stmt->fetchAll();
//print_r($results);

/*class Object extends Doctrine_Record
{	public function setTableDefinition()
    {	$this->hasColumn('bookTitle as title', 'string');
    }
}

//Object::setTableDefinition();

$newRecord = new Object();
//$newRecord->hasColumn('bung', 'string');
$newRecord->title = "bluahhaha";
$newRecord->save();
*/

class Book extends Doctrine_Record
{	public function setUp()
    {
        $this->hasMany('Author', array('local' => 'id', 'foreign' => 'book_id'));
        $this->hasOne('User', array('local' => 'user_id',
                                    'foreign' => 'id',
                                    'onDelete' => 'CASCADE'));
    }
    public function setTableDefinition()
    {
        $this->hasColumn('user_id', 'integer');
        $this->hasColumn('name', 'string',20);
    }
}

$blah = new Book();

$blah->name = "Redfour";
echo $blah->name.'<br><br>';

$blah->save();
?>
