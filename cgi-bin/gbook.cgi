#!/usr/bin/perl

$cmdLine = <STDIN>;
$cmdLine =~ s/\n//;

print "Content-type: text/html\n\n";
print "<html><head><title>subjektiv - news</title>";
print "</head>\n";

if($cmdLine =~ /\&close\=Abbrechen$/) {
	$cmdLine = "";
}
else {
	$cmdName = $cmdLine;
	if(!($cmdName =~ s/^name\=([^\&]*)\&.*/$1/)) {
		$cmdName = "";
	}
	else {
		$cmdName = NiceHtml($cmdName);
	}
	
	$cmdName =~ s/\+/ /;
	$cmdEmail = $cmdLine;
	if(!($cmdEmail =~ s/.*\&email\=([^\&]*)\&.*/$1/)) {
		$cmdEmail = "";
	}
	else {
		$cmdEmail = NiceHtml($cmdEmail);
	}
	
	$cmdText = $cmdLine;
	if(!($cmdText =~ s/.*\&text\=([^\&]*)$/$1/)) {
		$cmdText = "";
	}
	else {
		$cmdText = NiceHtml($cmdText, 1);
	}
}

$cmdStart = $ENV{'QUERY_STRING'};

$cmdForm = $cmdStart;

if(!($cmdStart =~ s/^start\=([^\&]*)$/$1/)) {
  $cmdStart = "0";
}

if($cmdForm eq "form") {
	print "<form method=\"post\" action=\"/cgi-bin/gbook.cgi\">";
	print "<table><tr><td colspan=2 align=right><a href=\"gbook.cgi\">X</a></td></tr><tr>";
	print "<td>Name: <input type=\"text\" name=\"name\"></td>";
	print "<td>eMail: <input type=\"text\" name=\"email\"></td></tr>";
	print "<tr><td>Text:</td></tr><tr><td colspan=2><textarea rows=5 cols=50 name=\"text\" wrap=visual></textarea></td></tr>";
	print "<tr><td align=right><input type=\"submit\" value=\"Eintragen\"></td><td align=left><input type=\"submit\" name=\"close\" value=\"Abbrechen\"></td></tr></table></form>";
}

if(length($cmdName) > 1 && length($cmdText) > 1) {
	system("date +'%A, %d. %B %Y' >/data/gbooktime.txt");
	open(RD, "gbooktime.txt");
	$time = <RD>;
	$time =~ s/\n//;
	close(RD);

	$time =~ s/Monday/Montag/;
	$time =~ s/Tuesday/Dienstag/;
	$time =~ s/Wednesday/Mittwoch/;
	$time =~ s/Thursday/Donnerstag/;
  $time =~ s/Friday/Freitag/;
	$time =~ s/Saturday/Samstag/;
	$time =~ s/Sunday/Sonntag/;
	$time =~ s/May/Mai/;
	$time =~ s/Juny/Juni/;
	$time =~ s/July/Juli/;
	$time =~ s/y//;
	$time =~ s/March/M&auml;rz/;
	$time =~ s/October/Oktober/;
	$time =~ s/December/Dezember/;

	open(TRG, ">>/data/gbook.txt");
	print TRG "<i><font size=-1>$time</font></i>\n";
	print TRG "<b>".$cmdName."</b>"." (<a href=\"mailto:".$cmdEmail."\">".$cmdEmail."</a>):\n";
  print TRG $cmdText."\n";
	close(TRG);
}

open(SRC, "gbook.txt");
@Comments = <SRC>;
close(SRC);

$startLine = $#Comments - $cmdStart * 3;

if($cmdStart > 0) {
	$prev = $cmdStart - 20;
	if($prev < 0) { $prev = 0; }
  print "<a href=\"gbook.cgi?start=$prev\">Vorige Seite</a> ";
}

if($cmdForm ne "form") {
	print "<a href=\"gbook.cgi?form\">Neuer Eintrag</a> ";
}

if($startLine - 19 * 3 - 2 > 0) {
	$next = $cmdStart + 20;
	print "<a href=\"gbook.cgi?start=$next\">N&auml;chste Seite</a>";
}

print "<hr>";

for($ln = 0; $ln < 20 && $startLine - $ln * 3 - 1 > -1; $ln++) {
	print $Comments[$startLine - $ln * 3 - 2]."<br>";
	print $Comments[$startLine - $ln * 3 - 1]."<br>";
	print $Comments[$startLine - $ln * 3]."<hr>";
}

if($cmdStart > 0) {
	$prev = $cmdStart - 20;
	if($prev < 0) { $prev = 0; }
  print "<a href=\"gbook.cgi?start=$prev\">Vorige Seite</a> ";
}

if($startLine - 19 * 3 - 2 > 0) {
	$next = $cmdStart + 20;
	print "<a href=\"gbook.cgi?start=$next\">N&auml;chste Seite</a>";
}


print "</body></html>";

sub NiceHtml {
	my $v;
	$v = $_[0];

	$v =~ s/\++/ /g;
	$v =~ s/%0[aA]//g;
	$v =~ s/%0[dD]/\n/g;
	$v =~ s/%[eE]4/&auml;/g;
	$v =~ s/%[fF]6/&ouml;/g;
	$v =~ s/%[fF][cC]/&uuml;/g;
	$v =~ s/%[cC]4/&Auml;/g;
	$v =~ s/%[dD]6/&Ouml;/g;
	$v =~ s/%[dD][cC]/&Uuml;/g;
	$v =~ s/%[dD][fF]/&szlig;/g;
	
	$v =~ s/%([0-9a-fA-F][0-9a-fA-F])/pack("C", hex($1))/eg;

	# Tags müssen auch noch raus
	$v =~ s/<[^>]*>//g;
	# auch einzeln reingeratene Tag-Öffner
	$v =~ s/[<>]//g;

	# Und noch ein Gimmick :) (muß extra durch 2. Parameter = 1 aktiviert werden)
	if($_[1] == "1") {
		$v =~ s/\n/<br>/g;
		$v =~ s/((subjektiv[rn]?)? +news)/<font color=\"\#ff00ff\">$1<\/font>/gi;
	}
	else {
		$v =~ s/\n//g;
  }
	return $v;
}
