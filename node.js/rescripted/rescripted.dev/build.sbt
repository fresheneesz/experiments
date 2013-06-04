libraryDependencies += "org.specs2" %% "specs2" % "1.7.1" % "test"

libraryDependencies += "rhino" % "js" % "1.7R2"

libraryDependencies += "org.jruby" % "jruby" % "1.6.5.1"

seq( sbtantlr.SbtAntlrPlugin.antlrSettings : _*)

