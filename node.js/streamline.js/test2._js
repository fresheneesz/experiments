function countLines(path, _) {
  return fs.readFile(path, "utf8", _).split('\n').length;
}

function compareLineCounts(path1, path2, _) {
  // parallelize the two countLines operations
  var n1 = countLines(path1);
  var n2 = countLines(path2);
  // join the results
  return n1(_) - n2(_);
}