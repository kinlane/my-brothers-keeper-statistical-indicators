// Purposely keeping this verbose, and expanded, until I figure out best patterns for config and extensability

$apicount = 0;
$propertycount = 0;

$includecount = 0;

// The Master
$MasterAPISJSON = "";

$apipropertyoptions = "";

function APIJSONNavigatorShowMe($row)
	{
	$thisrow = $row.id;
	$thisslug = $thisrow.replace("-icon","");

	$thisrow = document.getElementById($thisslug).style.display;

	if($thisrow=='none')
		{
		document.getElementById($thisslug).style.display = '';
		}
	else
		{
		document.getElementById($thisslug).style.display = 'none';
		}
	}

function APISJSONQuestions()
	{
	if(document.getElementById("questionsViewer").style.display=='')
		{
		document.getElementById("questionsViewer").style.display='none';
		document.getElementById("jsonViewer").style.display='none';
		document.getElementById("jsonNavigator").style.display='';
		}
	else
		{
		$viewer = JSON.stringify($MasterSwagger, null, 4);
		document.getElementById("jsonViewerDetails").value = $viewer;

		document.getElementById("questionsViewer").style.display='';
		document.getElementById("jsonViewer").style.display='none';
		document.getElementById("jsonNavigator").style.display='none';
		}
	}

// Header

function APIJSONNavigatorAPIJSONNavigatorSaveAPIs()
	{
	$apisJSONName = document.getElementById("apisjsonName").value;
	$apisJSONDescription = document.getElementById("apisjsonDescription").value;
	$apisJSONImage = document.getElementById("apisjsonImage").value;
	$apisJSONUrl = document.getElementById("apisjsonUrl").value;

 	$MasterAPISJSON['name'] = $apisJSONName;
 	$MasterAPISJSON['description'] = $apisJSONDescription;
 	$MasterAPISJSON['image'] = $apisJSONImage;
 	$MasterAPISJSON['url'] = $apisJSONUrl;

 	$html = APIJSONNavigatorGetHeaderCell($apisJSONName,$apisJSONDescription,$apisJSONUrl,$apisJSONImage);
 	document.getElementById("apisjsonHeaderCell").innerHTML = $html;
	}

// Localize Templating, making as editable as possible
function APIJSONNavigatorGetHeaderCell(name,description,url,image,apijsonurl)
	{
	html = "";

    html = html + '<a href="' + url + '" title="' + name + '"><img src="' + image + '" width="175" align="left" style="padding: 15px;" /></a>';

    html = html + '<a href="' + url + '" style="color: #000; font-size: 22px; text-decoration: none;" title="' + name + '"><strong>' + name + '</strong></a>';
   html = html + '  (<a href="/apis.json" style="color: #000; font-size: 18px;" title="' + name + '">apis.json</a>)';
    html = html + '<br />' + description;

	return html;
	}

// Localize Templating, making as editable as possible
function APIJSONNavigatorGetHeader(name,description,url,image,apijsonurl)
	{
    html = '<tr>';
    html = html + '<td align="left" valign="top" colspan="3" id="apisjsonHeaderCell">';
    html = html + '<a href="' + url + '" title="' + name + '"><img src="' + image + '" width="100" align="left" style="padding: 15px;" /></a>';

    html = html + '<a href="' + url + '" style="color: #000; font-size: 22px; text-decoration: none;" title="' + name + '"><strong>' + name + '</strong></a>';
    html = html + '  (<a href="' + url + '" style="color: #000; font-size: 18px;" title="' + name + '">apis.json</a>)';

    html = html + '<br />' + description;
    html = html + '</td>';
    html = html + '</tr>';

	return html;
	}

// Filler

function APIJSONNavigatorGetAPITitle(title,$apicount)
	{
	html = '<tr>';
	html = html + '<td colspan="2" style="padding-top: 5px; padding-bottom: 5px;">';
	html = html + '<span style="font-size:20px;">';
	html = html + '<strong>' + title + '</strong>';
	html = html + '</span>';
	html = html + '</td>';
	html = html + '</tr>';
	return html;
	}

// API Level

function APIJSONNavigatorGetAPIListingCell(name,description,image,url,$apicount)
	{

	$thisslug = name.toLowerCase();
	$thisslug = $thisslug.replace(" ", "-");

	$html = "";
    $html = $html + '<span style="font-size:20px;">';
    $html = $html + '<a href="' + url + '" style="color: #000; font-size: 18px; text-decoration: none;" title="' + name + '"><strong>' + name + '</strong></a> - ' + description;
	$html = $html + '</span>';

	return $html;
	}

function APIJSONNavigatorGetAPIListing(name,description,image,url,$apicount)
	{

	$thisslug = name.toLowerCase();
	$thisslug = $thisslug.replace(" ", "-");

    html = '<tr style="">';
    html = html + '<td align="left" style="padding-left: 50px; padding-top: 5px; padding-bottom: 5px;" colspan="2" id="api-cell-' + $apicount + '">';

    html = html + '<span style="font-size:20px;">';
    html = html + '<a href="' + url + '" style="color: #000; font-size: 18px; text-decoration: none;" title="' + name + '"><strong>' + name + '</strong></a> - ' + description;;
    html = html + '</span>';

    html = html + '</td>';
    html = html + '</tr>';

	return html;
	}

// Properties


function APIJSONNavigatorPropertyListingCell1($thistype,$thisurl,$apicount,$propertycount)
	{

	$thistype = $thistype.toLowerCase();
	$thisslug = $thistype.replace(" ", "-");

	$thishtml = "";
    $thishtml = $thishtml + '<a href="' + $thisurl + '" title="' + $thistype + '"><img style="padding: 5px;" src="https://s3.amazonaws.com/kinlane-productions/building-blocks/' + $thistype + '.png" width="50" align="right" " /></a>';

	return $thishtml;
	}

function APIJSONNavigatorPropertyListingCell2($thistype,$thisurl,$apicount,$propertycount)
	{

	$thistype = $thistype.toLowerCase();
	$thisslug = $thistype.replace(" ", "-");

	$thishtml = "";
    $thishtml = $thishtml + '<a href="' + $thisurl + '" style="color: #000; font-size: 16px; text-decoration: none;" title="' + $thistype + '"><strong>' + $thistype + '</strong></a>';

	return $thishtml;
	}

function APIJSONNavigatorPropertyListing($apiName,$thistype,$thisurl,$apicount,$propertycount)
	{

	$thistype = $thistype.toLowerCase();
	$thistypeclean = $thistype.replace("x-", "");
	$thistypeclean = $thistypeclean.replace("X-", "");
	$thistypeclean = $thistypeclean.replace("-", " ");
	$thisslug = $thistype.replace(" ", "-");

    html = '<tr>';
    html = html + '<td width="10%" align="right" id="api-' + $apicount + '-property-' + $propertycount + '-1" style="border: 0px solid #000;">';

    html = html + '<a href="' + $thisurl + '" title="' + $thistype + '"><img style="padding: 5px;" src="https://s3.amazonaws.com/kinlane-productions/building-blocks/' + $thistype + '.png" width="50" align="right" " /></a>';

    html = html + '</td>';
    html = html + '<td align="left" id="api-' + $apicount + '-property-' + $propertycount + '-2" width="50%" valign="middle" style="border: 0px solid #000; vertical-align: middle; padding-left: 10px;">';

    html = html + '<a href="' + $thisurl + '" style="color: #000; font-size: 18px;" title="' + $thistypeclean + '"><strong>' + $thistypeclean + '</strong></a>';

    if($thistype=='swagger')
    	{
    	html = html + '  (<a href="editor-swagger-json.html?url=' + $thisurl + '&oAuth_Token=' + $oAuth_Token + '">edit</a>)';
    	html = html + '  (<a href="swagger.html?oAuth_Token=' + $oAuth_Token + '">UI</a>)';
    	}

    html = html + '</td>';
    html = html + '</tr>';

	return html;
	}

// Include Level

function APIJSONNavigatorGetIncludeTitle(title,$includecount)
	{
	html = '<tr>';
	html = html + '<td colspan="2" style="padding-top: 5px; padding-bottom: 5px;">';
	html = html + '<span style="font-size:20px;">';
	html = html + '<strong>' + title + '</strong>';
	html = html + '</span>';
	html = html + '</td>';
	html = html + '</tr>';
	return html;
	}

function APIJSONNavigatorGetIncludeSpacer()
	{
	html = '<tr style="">';
	html = html + '<td colspan="2" style="padding-top: 5px; padding-bottom: 5px;"> ';
	html = html + '</td>';
	html = html + '</tr>';
	return html;
	}

function loadAPIsJSONNavigator($apisjsonURL)
    {

	var jqxhr = $.getJSON($apisjsonURL, function(apisJSON) {

		// Set our Master Store
		$MasterAPISJSON = apisJSON;

		buildAPIsJSONNavigator(apisJSON);

	});

	// Set another completion function for the request above
	jqxhr.complete(function() {

	  	document.getElementById("jsonNavigator").style.display='';

        });

    }

function buildAPIsJSONNavigator(apisJSON)

	{
	$apisJSONName = apisJSON['name'];

 	$apisJSONDesc = apisJSON['description'];
 	$apisJSONLogo = apisJSON['image'];
 	$apisJSONURL = apisJSON['url'];

 	// Header
    $html = APIJSONNavigatorGetHeader($apisJSONName,$apisJSONDesc,$apisJSONURL,$apisJSONLogo,$apisJSONURL);
    $('#jsonNavigatorTable').append($html);

    apisJSONTags = apisJSON['tags'];
    apisJSONAPIs = apisJSON['apis'];
    apisJSONIncludes = apisJSON['include'];
    apisJSONMaintainers = apisJSON['maintainers'];

    howmanyapis = apisJSONAPIs.length;

		$html = '<tr>';
		$html = $html + '<td colspan="2" style="padding-top: 5px; padding-bottom: 5px;">';
		$html = $html + '<span style="font-size:22px; font-weight: bold;">';
		$html = $html + '<strong>APIs</strong>';
		$html = $html + '</span>';
		$html = $html + '</td>';
		$html = $html + '</tr>';
		$('#jsonNavigatorTable').append($html);

		$html = '</tr>';
		$html = $html + '<tr>';
		$html = $html + '<td colspan="3"><hr style="padding: 0px; margin:0px;" /></td>';
		$html = $html + '</tr>';

		$('#jsonNavigatorTable').append($html);

     $.each(apisJSONAPIs, function(apiKey, apiVal) {

     	 $apiName = apiVal['name'];
     	 $apiDesc = apiVal['description'];
     	 $apiImage = apiVal['image'];
     	 $apiHumanURL = apiVal['humanURL'];
     	 $apiBaseURL = apiVal['baseURL'];
		 	 $apiTags = apiVal['tags'];
		   $Documentation_URL = "";
			 $Swagger_URL = "";

			 $apiProperties = apiVal['properties'];
		   $.each($apiProperties, function(propertyKey, propertyVal) {
		 	 		$propertyType = propertyVal['type'];
		 			$propertyURL = propertyVal['url'];
					if($propertyType=='x-documentation')
							{
							$Documentation_URL = $propertyURL;
							}
					if($propertyType=='Swagger')
							{
							$Swagger_URL = $propertyURL;
							}
		 			});
      if($Swagger_URL != '')
			  		{
						$html = '<tr>';
						$html = $html + '<td style="">';
						$html = $html + '<span style="font-size:16px;">';
						$html = $html + '<a href="' + $apiHumanURL + '"><strong>' + $apiName + '</strong></a>';
						$html = $html + '</span>';
						$html = $html + '</td>';

						$html = $html + '<td style="">';
						$html = $html + '<a href="/docs.html?swagger=' + $Swagger_URL + '"><img src="http://kinlane-productions.s3.amazonaws.com/api-evangelist-site/building-blocks/bw-list.png" width="35" /></a>';
						$html = $html + '</td>'

						$html = $html + '<td style="">';
						$html = $html + '<a href="' + $Swagger_URL + '"><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-swagger-round.png" width="35" /></a>';
						$html = $html + '</td>';

						$html = $html + '</tr>';
						$html = $html + '<tr>';
						$html = $html + '<td colspan="3"><hr style="padding: 0px; margin:0px;" /></td>';
						$html = $html + '</tr>';

						$('#jsonNavigatorTable').append($html);
						}

		 $apiContact = apiVal['contact'];
		 $apicount++;
	});

	}
