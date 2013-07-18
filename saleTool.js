<%@ page import="com.offers.internaltools.Statics" %>
<%@ page import="com.util.OfferUtil" %>
<%@ page import="java.util.*" %>
<%@ page import="com.util.ServerCategory" %>
<%@ page import="com.offers.PageMessage" %>
<%@ page import="com.offers.PaymentMapping" %>
<%@ page import="com.util.SecurityUtil" %>
<%@ page import="com.offers.util.OffersHttpServletRequest" %>

<%@ include file="/fragments/doctype.jsp" %>

<html>
<head>
    <title>Sale Tool 2.0</title>

    <style type="text/css">
        body {
            font-family: Verdana, Georgia, "Times New Roman", Times, serif;
            /* font-size: 62.5%; */
        }
        img, a{border: none; border-width: 0px;}
        a{outline: none;}
        table{border-collapse:collapse;border-spacing:0;}
            th{padding: 0 10px;}
                td{text-align: center;}

        h1 {
            text-align: center;
        }
        h3 {
            margin: 0px 0;
        }
        h4 {
            margin: 15px 0 3px;
        }
        textarea {
            border: 1px solid gray;
            border-bottom: 1px solid lightGray;
        }

        #app,#network,#currency {
            font-size: 18px;
        }
        #zone {
            display: inline-block;
        }

        .titleAbove {
            margin-top: 13px;
        }

        .paymethods.label
        {   width: 85px;
        }

        .abStatus {
            height: 16px;
            width: 16px;
            background-image: none;
            background-size:16px 16px;
            display: inline-block;
            position:relative;
            top:2px;
            background-repeat: no-repeat;
        }

        .abStatusFailure {
            background-image: url("<%=ServerCategory.getStaticBaseUrl()%>/images/x.gif");
        }

        .abStatusSuccess {
            background-image: url("<%=ServerCategory.getStaticBaseUrl()%>/images/tick.png");
        }

        .errorMessages {
            color: rgb(150, 0,0);
        }
        .emptyText {
            color: gray;
        }
            .odd .emptyText {
                color: lightgray;
            }

        .dropDownArrow {
            background-color: white;
            border: 1px solid gray;
            border-left: none;
            border-bottom: 1px solid lightGray;
            cursor: pointer;

            font-size: 13px;
            font-weight: bold;
        }

        .dropDownList {
            list-style-type: none;
            padding: 0px;
            margin: 0px;

            border: 1px solid gray;
            background-color: white;
        }
            .dropDownList li {
                cursor: pointer;
            }

        .headerDropDown {
            position: absolute;
            left: 400px;
            top: 13px;
        }

        .item {
        }
            .item .image {
                cursor: pointer;
            }
            .item .emptyText {
                text-decoration: underline;
            }
            .item img {
                max-height: 50px;
                max-width: 100px;
            }
            .item .itemInfo {

            }
                .item.closed .itemInfo {
                    display: none;
                }


        .button {
            background-color: lightgray;
            border: 2px solid gray;
            cursor: pointer;
            display: inline-block;
            font-size: 13px;
            margin: 10px;
            padding: 2px;
        }
            .small.button {
                font-size: 10px;
                margin: 3px;
            }
            .button.modified {
                background-color: rgb(255,150,150);;
                border-color: rgb(255,30,30);
            }

            .button input {
                cursor: pointer;
            }
            .save.button, .launch.button {
                background-color: rgb(150,255,150);
            }
            .end.button {
                background-color: rgb(255,200,200);
            }
            .newGroup.button, .add.button {
                background-color: rgb(162, 234, 253);
            }

            .export.button, .import.button {
                background-color: rgb(205,205,0);
            }

            .deploy.button, .launchProd.button  {
                display: none; /* initially */
            }



        .label, .checkBoxLabel {
            color: rgb(80,80,80);
            font-size: 11px;
            font-family: Tahoma;
            display: inline-block;
        }
        .checkBoxLabel {
            position: relative;
            bottom: 3px;
        }

        .longField, .messageField  {
            width: 400px;
            height: 20px;
        }

        .messageField {
            width: 400px;
            height: 60px;
        }
        .numberField
        {   width: 40px;
        }
        .long.numberField, .shortField
        {   width: 80px;
            height: 20px;
        }
        .timeField
        {   font-size: 11px;
            width: 105px;
        }
        .mediumField
        {   font-size: 10px;
            width: 200px;
        }
        .small.field
        {   font-size: 11px;
        }
        .short.field
        {   width: 80px;
        }

        .checkboxWrapper.modified
        {   border: 4px solid red;
        }

        .note
        {   font-size:10px;margin-bottom:10px;
        }

        table td,
        .headerlessTable
        {   background-color: rgb(152, 224, 243);
        }
            #offersForCurGame tr:hover td
            {   background-color: rgb(162, 234, 253);
            }

        table .odd td
        {   background-color: #5AA5CF;
        }
            #offersForCurGame .odd:hover td
            {   background-color: rgb(100, 175, 217);
            }

        table .modified td, #offersForCurGame tr.modified:hover td,
        table td.modified,
        input.modified, select.modified, textarea.modified
        {   background-color: rgb(255,150,150);
        }

        .infoTable th
        {   border-left: 1px solid gray;
        }
            .infoTable td
            {   border: 1px solid gray;
            }


        #exportText {
            width: 550px;
            height: 60px;
        }
        .saleGroup {
            border: 1px solid black;
            padding: 10px;
            position: relative;
            margin: 10px;

            max-width: 513px;
            display: inline-block;
            vertical-align: top;
            background-color: rgb(245,250,255);

        }
            .activeText, .futureText, .intText, .prodText {
                position: absolute;
                font-weight: bold;
                right: 10px;
                display: none;
            }
                .activeText, .futureText {
                    margin-top: 20px;
                }
                .activeText {
                    color: green;
                }
                .futureText {
                    color: rgb(10, 10, 130);
                }

                .prodText {
                    color: rgb(150, 0, 0);
                }
                .intText {
                    color: rgb(100, 100, 0);
                    display: block;
                }


            .saleGroup.active {
                border: 2px solid green;
                background-color: rgb(240, 240, 230);
            }
                .saleGroup.active .activeText {
                    display: block;
                }
            .saleGroup.future {
                border: 2px solid rgb(10, 10, 130);
                background-color: rgb(240, 240, 230);
            }
                .saleGroup.future .futureText {
                    display: block;
                }


            .saleGroup.prod {
                background-color: #F7E9BB;
                border: 2px solid #B7421F;
            }
                .saleGroup.prod .prodText {
                    display: block;
                }
                .saleGroup.prod .intText {
                    display: none;
                }

            .saleGroup.modified
            {   background-color: rgb(255,200,200);
            }

            .saleGroup .cancelRemove {
                display: none;
            }
                .saleGroup.modified .cancelRemove {
                    display: inline-block;
                }
                .saleGroup.modified .removeGroup {
                    display: none;
                }

            .saleGroup .groupNumber {
                font-size: 10px;
                position: absolute;
                right: 1px;
                top: 1px;
            }

            .segmentationType {
                font-size: 11px;
            }

            .pricesTable {
                margin-top: 10px;
                font-size: 12px;
            }
                .pricesTable .default {
                    cursor: pointer;
                }

                .priceRow .cancelPriceRemove {
                    display: none;
                }
                    .priceRow.modified .cancelPriceRemove {
                        display: inline-block;
                    }
                    .priceRow.modified .remove {
                        display: none;
                    }

            #insertGroup
            {   margin-left:160px;
            }

        table td.nocell {
            margin: 0;
            padding: 0;
            background-color: transparent;
            border: none;
        }
            table td.nocell div.button {
                margin: 0 3px;
            }

        .iframeIdLoader, #zone {
            float: left;
        }
        #zone {
            margin-left: 10px;
            margin-top: 25px;
        }

        .toolTip {
            background-color: rgba(255, 255, 255, 0.9);
            border: 1px solid gray;
            font-family: fantasy;
            font-size: 10px;
            z-index: 10;
            position: absolute;
            display:none;
        }
        .userTypeHelp {
            left: 154px;
        }
        .timeHelp {
        }

    </style>


</head>

<body>

    <%@ include file="toolFragments/toolJS.jsp"%>

    <h2>Sale Tool</h2>

    <%@ include file="toolFragments/iframeIdLoader.jsp"%>

    <select id="zone" class="shortField titleAbove" title="zone:" value="bonus"></select>

    <% if(ServerCategory.isProduction()) { %>
        <div style="background-color:lightcoral;color:darkRed;font-size: 20px;font-weight: bold;margin: 5px;text-align: center;">
            PRODUCTION
        </div>
    <% } %>

    <br><br><br>

    <%--<div id="uploadImage">upload</div>--%>

    <div class="launch button">Launch (Integration)</div>
    <div class="launchProd button">Launch (Prod)</div>
    <div class="save button">Save (Integration)</div>
    <div class="deploy button">Deploy (Prod)</div>
    <div class="end button" title="Changes the end-time to now">End Sale (Integration)</div>
    <div class="endProd button" title="Changes the end-time to now">End Sale (Prod)</div>
    <div class="newGroup button">New Group</div>
    <div class="export button">Export</div>
    <div class="import button">Import</div>
    <div class="prodToggle button">View Production</div><br>
    <div id="jsonDiv" style="display:none;">
    JSON:<br>
    <textarea id="exportText"></textarea>
    </div>

    <ul id="errorMessages" class="errorMessages"></ul>
    Show over main frame <input type="checkbox" id="useOnMain"><br>
    <div id="oldGroups"></div>

    <div id="saleGroups"></div>

    <div class="launch button">Launch (Integration)</div>
    <div class="launchProd button">Launch (Prod)</div>
    <div class="save button">Save (Integration)</div>
    <div class="deploy button">Deploy (Prod)</div>
    <div class="end button" title="Changes the end-time to now">End Sale (Integration)</div>
    <div class="endProd button" title="Changes the end-time to now">End Sale (Prod)</div>
    <div class="newGroup button">New Group</div>



    <br><br><br><br><br><br><br><br><br><br><br><br><br>


<script src="${staticBaseUrl}/scripts/proto.js" type="text/javascript"></script>
<script type="text/javascript" src="${nonVersionedStaticBaseUrl}/scripts/datetimepicker.js"></script>
<script src="https://crypto-js.googlecode.com/svn/tags/3.0.2/build/rollups/hmac-sha1.js" type="text/javascript"></script>
<script src="https://crypto-js.googlecode.com/svn/tags/3.0.2/build/components/enc-base64-min.js" type="text/javascript"></script>
<script type="text/javascript">

    var serverGroupsCache; // keeps the list of groups last sent from the server

    var ajaxUrl = "/tools/sale2?";
    <%if (request.getParameter("hash") != null) {%>
        ajaxUrl += "hash=<%=request.getParameter("hash")%>&username=<%=request.getParameter("username")%>&expire_by=<%=request.getParameter("expire_by")%>&role=<%=request.getAttribute("roles")%>&";
    <%}%>




    function doesGroupMatchServer(groups) {
        return compareSaleGroups(groups, serverGroupsCache);
    }

    function getGroupsJson() {
            var groups = [];
            $(".saleGroup").each(function() { var group = $(this);
                var groupJson = saleTool.saleGroup.toJson(group);
                groups.push(groupJson);
            });
            return groups;
    }

    function compareSaleGroups(groupsA, groupsB) {
        if(groupsA.length !== groupsB.length)
            return false;

        for(var n in groupsA) { var x = groupsA[n];
            var someTrue = false;
            for(var j in groupsB) { var y = groupsB[j];
                if(saleTool.saleGroup.equal(x,y)) {
                    someTrue = true;
                    break;
                }
            }
            if(!someTrue) return false;
        }
        // else
        return true;
    }

    $(function() {
        var usingItemTransactionApi = true;
        <% if( ! ServerCategory.isProduction()) { %>
            saleTool.unitTests();
        <% } %>

        $('#zone').comboBox();
        $('#zone').positionTitle('above','label');

        iframeIdLoader.init(function(app, network, currency) {
            var zone = 'bonus';
            $('#zone').val(zone);
            saleTool.refresh(app, network, currency, zone);
        });

        $(".prodToggle").click(function() {
            $(".saleGroup").each(function() {
                var node = $(this);
                node.toggle();
                node.find(".titleAbove").positionTitle();   // inserted to fix the titles on items (when there is an item in a loaded group)
            });
        });

        var zoneTimer;
        $("#zone").live('change', function() {
            if(zoneTimer) {
                clearTimeout(zoneTimer);
                zoneTimer = undefined;
            }

            saleTool.refresh($("#app").val(), $("#network").val(), $("#currency").val(), $(this).val());
        });

        $('#zone').bind('keyup', function(e) {
            var zoneNode = $(this);
            if(zoneTimer) {
                clearTimeout(zoneTimer);
                zoneTimer = undefined;
            }

            zoneTimer = setTimeout(function() {
                var keyPressed = String.fromCharCode(e.which);
                if($(this).val() != '' && ('a'<=keyPressed&&keyPressed<='z' || 'A'<=keyPressed&&keyPressed<='Z'
                                        || '0'<=keyPressed&&keyPressed<='9' || keyPressed=='_')) {
                    $("#zone").val(zoneNode.val()).trigger('change');
                }
            }, 700);
        });


        // main buttons

        $('.newGroup.button').click(function(event){
            var group = saleTool.saleGroup.make(saleTool.styles, saleTool.messages);
            saleTool.saleGroup.modifyWithJson(group, saleTool.emptyGroupJson);
            saleTool.refreshItemFields();
        });


        var saveGroups = function() {
            try {
                if( ! saleTool.validate.groups()) {
                    alert("Groups didn't validate");
                    return;
                }

                var groups = getGroupsJson();
                if(doesGroupMatchServer(groups)) {
                    alert("Nothing to Save!");
                    return;
                }

                if(groups.length < 1) {
                    alert('No groups to launch..');
                    return;
                }

                var iframeTriplet = {app: $("#app").val(), network: $("#network").val(), currency: $("#currency").val()};
                var request = $.extend(iframeTriplet,{groups:groups});
                try {
                    saleTool.ldapMonetizationApiRequest('save', request);
                } catch(e) {
                    if(e.type == 'saleZoneConfirmation') {
                        if(confirm(e+" Do you want to override it?")) {
                            for(var n in request.groups) { var g = request.groups[n];
                                g.overrideShowOverMain = true;
                            }
                            saleTool.ldapMonetizationApiRequest('save', $.extend(iframeTriplet,{groups:groups}));
                        } else {
                            throw "didntConfirm";
                        }
                    } else {
                        throw e;
                    }
                }
                saleTool.refresh(iframeTriplet.app, iframeTriplet.network, iframeTriplet.currency, $("#zone").val());
            } catch(e) {
                if(e !== "didntConfirm") {
                   alert("Problem saving: "+e);
                }
            }
        };


        $('.launch.button, .save.button').click(saveGroups);

        $('.end.button').click(function() {
            if(confirm('Are you sure you want to end the sale?')) {
                $(".saleGroup").each(function() { var group = $(this);
                    group.addClass("modified"); // marks the group for deletion
                });
                saveGroups();
            }
        });

        $('.copyGroup.button').live("click",function() {

            var groupJson = saleTool.saleGroup.toJson($(this).closest('.saleGroup'));
                saleTool.modifyGroupJsonForMakingACopy(groupJson);

            var newGroup = saleTool.saleGroup.make(saleTool.styles, saleTool.messages);
            saleTool.saleGroup.modifyWithJson(newGroup, groupJson);
            saleTool.refreshItemFields();
        });

        $('.export.button').click(function() {
            if ($("#jsonDiv").css("display") != "none") {
                $("#jsonDiv").val("");
                $("#jsonDiv").css("display","none");
                return;
            }

            var groups = [];
            $(".saleGroup").each(function() { var group = $(this);    // todo: modularize this
                var groupJson = saleTool.saleGroup.toJson(group);
                    saleTool.modifyGroupJsonForMakingACopy(groupJson);
                groups.push(groupJson);
            });

            $("#exportText").val(JSON.stringify(groups));

            $("#jsonDiv").css("display","block");
        });

        $('.import.button').click(function() {
            if ($("#jsonDiv").css("display") == "none") {
                $("#jsonDiv").css("display","block");
                return;
            }

            var groupsJson = $("#exportText").val();
            if(groupsJson == "") {
                alert('No JSON found');
            } else {
                // clear current sale groups
                $('.saleGroup').remove();

                var groups = JSON.parse(groupsJson);

                for(var n in groups) { var g = groups[n];
                    var group = saleTool.saleGroup.make(saleTool.styles, saleTool.messages);
                    saleTool.saleGroup.modifyWithJson(group, g);
                    saleTool.refreshItemFields();
                }
            }

            $("#jsonDiv").css("display","none");

            $(".saleGroup.active").removeClass("active");
            $(".saleGroup.active").removeClass("future");
            $(".saleGroup .endDate").val("");
            $(".saleGroup .startDate").val("");
        });



        // Buttons on the group

        $('.removeGroup.button').live('click', function() {
            var group = $(this).closest('.saleGroup');
            if(group.hasClass("active") || group.hasClass("future")) {
                group.addClass("modified");
            } else {
                group.remove();
                saleTool.reLetterGroups();
            }

        });

        $(".abTestName, .abTestValue").live('change',function() {
            var group = $(this).parent();
            group.find(".abStatus").removeClass("abStatusFailure");
            group.find(".abStatus").removeClass("abStatusSuccess");
            var testValue = group.find(".abTestValue").val();
            var testName = group.find(".abTestName").val();
            if (testValue != "" && testName != "") {
                simpleGetJax(ajaxUrl + 'action=verifyAbTest',
                    {app:$("#app").val(),network:$("#network").val(),abTestShard:testValue,abTestName:testName},
                function(data) {
                    group.find(".abStatus").addClass("abStatus" + data.status);
                });
            }
        });
        
        $('.cancelRemove.button').live('click', function() {
            var group = $(this).closest('.saleGroup');
            group.removeClass("modified");

        });

        // Segmentation and scheduling

        $('.saleGroup .segmentationType').live('change keyup', function() {
            var saleGroup = $(this).closest('.saleGroup');

            saleGroup.find('.abTestName, .abTestValue, .abStatus').hide();

            var value = $(this).val();
            if(value==='abTestGroups') {
                saleGroup.find('.abTestName, .abTestValue, .abStatus').show();
            }

            $(".titleAbove").positionTitle();
        });


        $('.saleGroup .purchaseRestriction').live('change keyup', function() {
            var saleGroup = $(this).closest('.saleGroup');

            var value = $(this).val();
            if(value == 'single') {
                $(".purchaseRestrictionFlag").show();
            } else {
                $(".purchaseRestrictionFlag").hide();   
            }

            $(".titleAbove").positionTitle();
        });

        $(window).resize(function() { $(".titleAbove").positionTitle();});



        // Pricing

        $('.saleGroup .pricesTable .remove.button').live('click', function() {
            var group = $(this).closest('.saleGroup');
            if(group.hasClass("active") || group.hasClass("future")) {
                $(this).closest('tr').addClass("modified");
            } else {
                $(this).closest('tr').remove();
                $(this).closest('table').reOddify();
            }
        });
        $('.saleGroup .pricesTable .cancelPriceRemove.button').live('click', function() {
            $(this).closest('tr').removeClass("modified");
        });

        $('.saleGroup .add.button').live('click', function() {
            var saleGroup = $(this).closest('.saleGroup');
            var table = saleGroup.find('.pricesTable');
            var lastrow = table.children('tbody').children('tr:last');

            var priceRow = $(saleTool.saleGroup.price.make());
            lastrow.after(priceRow);
            saleGroup.find('.pricingType').trigger('change'); // hide the right columns
            table.reOddify();
            priceRow.find(".titleAbove").positionTitle('above', 'label');

            saleTool.setupNewPricePoint(priceRow);
        });

        $('.saleGroup .pricesTable .default').live('click', function() {
            var input = $(this).find('input');
            var radioSet = $(this).closest('form').find("input[name='"+input.attr("name")+"']");

            radioSet.attr("checked", false);    // deselect all radio buttons
            input.attr("checked", true);    // select that radio button
            radioSet.change();  // trigger change
        });

        $('.saleGroup .pricingType').live('change keyup', function() {
            var saleGroup = $(this).closest('.saleGroup');

            saleGroup.find('.pricesTable .discount, .pricesTable .bonus').hide();

            var value = $(this).val();
            if(value==='bonus') {
                saleGroup.find('.pricesTable .bonus').show();
            } else if(value==='discount') {
                saleGroup.find('.pricesTable .discount').show();
            }
        });

        $('.saleGroup .pricesTable .addItem').live('click', function() {
            $(this).closest('.priceRow').find('.itemTable').children('tbody').append(saleTool.saleGroup.item.make());
            saleTool.refreshItemFields();
        });

        $('.item').live('click',function(e) {
            var itemInfo = $(this).find(".itemInfo");
            if($(e.target).parents().index(itemInfo) == -1 && $(e.target).index(itemInfo) == -1) {
                $(this).toggleClass('closed');
                $(this).closest('.pricesTable').find(".titleAbove").positionTitle();
            }
        });

        $('.item .imageUrl').live('change',function() {
            return saleTool.itemImageChange($(this));
        });

        // payment methods

        $('.saleGroup .paymentMethod, .saleGroup .paymentMethod input').live('click', function(event) {
            var checkbox = $(this).find('input');
            if(checkbox.attr('checked')) {
                checkbox.attr('checked',false);
            } else {
                checkbox.attr('checked',true);
            }
            event.stopPropagation();  // prevents the button from thinking its clicked twice when the checkbox is clicked
            checkbox.change();  // trigger change
        });

        $('.priceRow').live('init', function() {
            var priceRow = $(this);
            saleTool.setupNewPricePoint(priceRow);
            priceRow.find(".titleAbove").positionTitle('above', 'label');
            priceRow.find(".item .imageUrl").each(function() {
                saleTool.itemImageChange($(this));
            });            
        });

        // other stuff

        var setUpToolTip = function(mainSelector, tipSelector) {
            $(mainSelector).live('mouseenter', function() {
                $(this).siblings(tipSelector).show();
            });
            $(mainSelector).live('mouseleave', function() {
                $(this).siblings(tipSelector).hide();
            });
        };

        toolJS.setUpToolTip('.userType', ".userTypeHelp");
        toolJS.setUpToolTip('.startDate, .endDate', ".timeHelp");

    });



    var loadingImage = '<img class="loadingImage" src="${staticBaseUrl}/images/loading.gif">';

    var saleTool = {
        reLetterGroups: function() {
            var groupNumber=0;
            $(".saleGroup .groupLetter").each(function() {
                $(this).html(String.fromCharCode('A'.charCodeAt(0)+groupNumber));
                groupNumber++;
            });
        },
        rebuildCalendars: function() {
            var groupNumber=0;
            $(".saleGroup .startDate").each(function() {
                $(this).attr("id","startDate" + (String.fromCharCode('A'.charCodeAt(0)+groupNumber)));
                groupNumber++;
            });
            groupNumber=0;
            $(".saleGroup .startCalendar").each(function() {
                $(this).attr("onClick","NewCal('startDate" + (String.fromCharCode('A'.charCodeAt(0)+groupNumber)) + "','yyyymmdd',true,24);document.getElementById('calendarIframeDiv').style.display='block';");
                groupNumber++;
            });
            groupNumber=0;
            $(".saleGroup .endDate").each(function() {
                $(this).attr("id","endDate" + (String.fromCharCode('A'.charCodeAt(0)+groupNumber)));
                groupNumber++;
            });
            groupNumber=0;
            $(".saleGroup .endCalendar").each(function() {
                $(this).attr("onClick","NewCal('endDate" + (String.fromCharCode('A'.charCodeAt(0)+groupNumber)) + "','yyyymmdd',true,24);document.getElementById('calendarIframeDiv').style.display='block';");
                groupNumber++;
            });
        },

        refreshItemFields: function() {
            var iframeTriplet = {app: $("#app").val(), network: $("#network").val(), currency: $("#currency").val()};
            var request = $.extend(iframeTriplet,{version:1.0});
            var result = saleTool.ldapMonetizationApiRequest('getItemServiceType', request,"/api/game");
            if (result.itemTransactionApi != true) {
                $(".itemTransactionApi").hide();
            }
        },

        setupNewPricePoint: function(priceRow) {
            var thisButton = priceRow.find('.upload.button');
            new AjaxUpload(thisButton,
            {   action: function () {return ajaxUrl + 'action=upload&app='+$("#app").val();},
                onSubmit: function(id, fileName) {
                    thisButton.closest('.item').find('.image').html(loadingImage);
                    $(".titleAbove").positionTitle();
                },
                onComplete: function(file, response) {
                    var result = JSON.parse(response);

                    if(result.path !== undefined) {
                        window.open('https://build-hq01.playdom.com/view/J-R/view/OFFERS-PROD/job/OFFERS_PROD_static_content_rawpath/buildWithParameters?SOURCE='+result.path);

                        // poll for window close
                        var relativeImageUrl = 'static/'+result.path;
                        var absolutizedImageUrl = 'https://<%=ServerCategory.PRODUCTION.getStaticsBasePath()%>/'+ result.path;
                        var timer = setInterval(function() {
                            if(toolJS.urlExists(absolutizedImageUrl)) {
                                clearInterval(timer);
                                var imageUrl = thisButton.closest('.item').find('.imageUrl');

                                <% if(ServerCategory.isProduction()) { %>imageUrl.val(relativeImageUrl);
                                <% } else { %>imageUrl.val(absolutizedImageUrl);<% } // if its QA, absolutize the image url %>
                                saleTool.itemImageChange(imageUrl);
                            }
                        }, 1000);
                    } else {
                        alert("Problem uploading file: "+result.error);
                    }
                }
            });

            thisButton = priceRow.find('.toolTipUpload.button');
            new AjaxUpload(thisButton,
                    {   action: function () {return ajaxUrl + 'action=upload&app='+$("#app").val();},
                        onComplete: function(file, response) {
                            var result = JSON.parse(response);

                            if(result.path !== undefined) {
                                window.open('https://build-hq01/view/J-R/view/OFFERS-PROD/job/OFFERS_PROD_static_content_rawpath/buildWithParameters?SOURCE='+result.path);

                                // poll for window close
                                var relativeImageUrl = 'static/'+result.path;
                                var absolutizedImageUrl = 'https://<%=ServerCategory.PRODUCTION.getStaticsBasePath()%>/'+ result.path;
                                var timer = setInterval(function() {
                                    if(toolJS.urlExists(absolutizedImageUrl)) {
                                        clearInterval(timer);
                                        var imageUrl = thisButton.closest('.item').find('.itemToolTip');

                                        <% if(ServerCategory.isProduction()) { %>imageUrl.val(relativeImageUrl);
                                        <% } else { %>imageUrl.val(absolutizedImageUrl);<% } // if its QA, absolutize the image url %>
                                    }
                                }, 1000);
                            } else {
                                alert("Problem uploading file: "+result.error);
                            }
                        }
                    });
        },

        itemImageChange: function(theThis) {
            var imgUrl = toolJS.absolutizeStaticUrl(theThis.val());
            theThis.closest('.item').find('.image').replaceWith('<img class="image" src="'+imgUrl+'">');

            var timer = setInterval(function() {
                theThis.closest('.pricesTable').find(".titleAbove").positionTitle();
                clearInterval(timer);
            }, 100);
        },

        initActiveZones: function(app,network,currency) {
            var groups = saleTool.getSaleGroups({app:app,network:network,currency:currency, statuses:["live","future"]});

            var options = {};
            for(var n in groups) {
                options[groups[n].zone] = groups[n].zone;
            }

            $('#zone').changeList(options);
        },

        getStyles: function(app) {
            return saleTool.ldapMonetizationApiRequest('styles', {app: app}).styles;
        },
        getMessages: function(app) {
            return saleTool.ldapMonetizationApiRequest('messages', {app: app}).messages;
        },

        getSaleGroups: function(options) {
            return saleTool.ldapMonetizationApiRequest('groups', options).groups;
        },

        productionConfig: function(options, callback) {
            var request = new saleTool.AuthenticatedMonetizationApiRequest('monetization', 'monetization', undefined, undefined, '<%=SecurityUtil.getSecretMonetizationKey()%>', true);
            for(var x in options) {
                request.request[x] = options[x]; // merge in options
            }

            request.send('<%=((OffersHttpServletRequest)request).getProtocol()%>://<%=ServerCategory.get().getPromotionEnvironment().getPaymentsHostname()%>/api/saleInternal', function(data) {
                callback(data.groups);
            });
        },

        validate: {
            integer: function(value) {  //validateInteger
                return 0 <= parseInt(value);
            },
            // positive real
            real: function(value) {
                return 0 <= parseFloat(value);
            },

            date: function(date) {
                return true;
            },

            groups: function () {
                var groups = $(".saleGroup").not(".modified");
                var success = true; // assume true

                var assert = function(test, failureMessage) {
                    assertRaw($("#errorMessages"), test, failureMessage);
                };
                var assertRaw = function(div, test, failureMessage) {
                    if(!test) {
                        success = false;
                        if(failureMessage !== undefined)
                            div.append("<li>"+failureMessage+"</li>");
                    }
                    return test;
                };

                $(".errorMessages").html(''); // clear error messages

                var segmentationAcrossGroups = null;
                var modGroups = new JS.Set([]);
                groups.each(function() {    // validate groups individually
                    var x = $(this);

                    var assert = function(test, failureMessage) {
                        assertRaw(x.find(".errorMessages"), test, failureMessage);
                    };

                    var segmentationType = x.find(".segmentationType").val();

                    if(segmentationAcrossGroups === null) {
                        segmentationAcrossGroups = segmentationType;
                    } else {
                        if(segmentationAcrossGroups !== segmentationType) {
                            segmentationAcrossGroups = false;
                        }
                    }

                    if (segmentationAcrossGroups == "all" || segmentationAcrossGroups == false) {
                        var types = {};
                        for (var i=0;i<groups.length;i++) {
                            var group = groups[i];
                            var userType = $(group).find(".userType");
                            if (types[$(userType).val()] === undefined && $(userType).val() != "") {
                                types[$(userType).val()] = 1;
                            } else {
                                assert(groups.length === 1,"Incorrect user type");
                            }
                        }
                        segmentationAcrossGroups = "user";
                    }

                    if(segmentationType == 'abTestGroups') {
                        assert(x.find('.abTestName').val() != '' && x.find('.abTestValue').val() != '',
                                "You should put in an AB Test Name and AB Test Group");

                        //assert(x.find(".abStatus").hasClass("abStatusSuccess"), "AB Test name or group is wrong.");
                    }

                    assert(saleTool.validate.date(x.find(".startTime").val()), "Start-time isn't formatted correctly");
                    assert(saleTool.validate.date(x.find(".endTime").val()), "End-time isn't formatted correctly");
                    assert(jQuery.trim(x.find(".header").val()).length > 0 || jQuery.trim(x.find(".message").val()).length > 0,
                                "You're missing a header and/or message");

                    saleTool.validate.prices(assert, x);
                    saleTool.validate.items(assert, x);

                    assert(x.find('.paymentMethod.fbCredits input').attr("checked")
                            || x.find('.paymentMethod.creditCard input').attr("checked")
                            || x.find('.paymentMethod.paypal input').attr("checked"),
                           "No payment method selected");

                    $(".titleAbove").positionTitle();

                });

                    // validate things that shoud be consistent across groups
                assert(segmentationAcrossGroups !== false, "All groups should have the same segmentation");
                assert(groups.length === 1 || segmentationAcrossGroups !== 'all', "If you set the segmentation to 'All Users', you should only have one group");

                return success;
            },

            items: function(assert, group) {
                group.find('.pricesTable .priceRow').each(function() { n++;
                    var x = $(this);

                    var name = x.find(".item .itemName").val();
                    var itemInfoRows = x.find(".item .itemTable tr");
                    var hasId = false;  // assume false until proven otherwise
                    itemInfoRows.each(function() {
                        var id = $(this).find('.itemIdentifier');
                        if(id.length === 1) { // if this isn't the header
                            if(id.val() !== '') {
                                hasId = true;
                            }

                            var itemParameters = $(this).find(".itemParameters").val();
                            if(itemParameters !== '') {
                                try {
                                    JSON.parse(itemParameters);
                                } catch(e) {
                                    assert(false, "Item Parameters must be a valid JSON object or must be left blank. You entered '"+itemParameters+"'");
                                }
                            }
                        }
                    });

                    assert(name != "" || !hasId, "Item Name cannot be blank.");

                    assert(name == "" || hasId, "There are items without item identifiers");
                });
            },

            prices: function(assert, group) {
                var pricingType = group.find(".pricingType").val();
                var bonus = pricingType === 'bonus';
                var discount = pricingType === 'discount';

                var foundDefault = false;
                var n=0;
                group.find('.pricesTable .priceRow').each(function() { n++;
                    var x = $(this);
                    if( ! x.hasClass("modified")) { // ignore removed prices

                        var price = x.find(".price input").val(),
                            payout = x.find(".payout input").val(),
                            oldPrice = x.find(".oldPrice input").val(),
                            oldPayout= x.find(".oldPayout input").val();

                        assert(saleTool.validate.real(price) && price > 0, "In price row "+n+", your price isn't valid");
                        assert(saleTool.validate.integer(payout) && payout > 0, "In price row "+n+", your payout isn't valid");
                        if(discount) {
                            assert(saleTool.validate.real(oldPrice) && oldPrice > 0, "In price row "+n+", your old price isn't valid");
                        } else if(bonus) {
                            assert(saleTool.validate.integer(oldPayout) && oldPayout > 0, "In price row "+n+", your old payout isn't valid");
                        }

                        if(x.find('.default input').attr("checked")) {
                            foundDefault = true;
                        }
                    }
                });

                assert(foundDefault, "Select a default price");
            }
        },

        buildOldSales: function(iframeTriplet) {
            var groups = saleTool.getSaleGroups($.extend(iframeTriplet, {statuses: ['past']}));

            var options = $("<select id='oldSalesSelect'></select>");
            var firstOption = $('<option class="emptyOption">Previous Sales:</option>');
            options.append(firstOption);
            for(var n in groups) { var g = groups[n];
                /*var splitDate = g.end.split(" ");
                var date = splitDate[0];
                var time = splitDate[1];*/
                var text = g.header!==null?g.header:g.message;
                var option = $("<option>" + g.end + " / " + text + "</option>");
                    option.data("groupData", g); // store group data
                options.append(option);
            }

            $("#oldGroups").html("Previous Sales:");
            $("#oldGroups").append(options);

            options.change(function(event) {
                if($(this).hasClass("emptyOption")) return; // ignore empty option

                var groupData = $(this).find("option:selected").data('groupData');
                    saleTool.modifyGroupJsonForMakingACopy(groupData);

                var group = saleTool.saleGroup.make(saleTool.styles, saleTool.messages);
                    saleTool.saleGroup.modifyWithJson(group, $(this).find("option:selected").data('groupData'));
                saleTool.refreshItemFields();
                saleTool.showPaymentMethodsForNetwork();

                $('.save.button, .end.button').hide();
                $('.launch.button').show();
            });
        },

        refresh: function(app, network, currency, zone) {
            try {
                $('#zone').positionTitle();

                // no app selected
                if (app == "") {
                    return;
                }

                $('#saleGroups').html(loadingImage);  // clear saleGroups
                $("#oldGroups").html("");

                saleTool.initActiveZones(app, network, currency);
                $("#zone").val(zone);

                var iframeTriplet = {app: app, network: network, currency: currency};

                var styles = saleTool.styles = saleTool.getStyles(iframeTriplet.app);
                var messages = saleTool.messages = saleTool.getMessages(iframeTriplet.app);

                var saleQuery = {svnRevision: <%=OfferUtil.getLocalSvnRevision(request.getProtocol())%>, apiName:'groups', app:app,network:network,currency:currency, zone: zone, statuses:["live","future"]};
                var saleGroups = saleTool.getSaleGroups(saleQuery);
                saleTool.productionConfig(saleQuery, function(productionConfig) {
                    try {
                        serverGroupsCache = saleGroups;

                        var prodEqualsQA = compareSaleGroups(productionConfig, saleGroups);

                        $('.launch.button, .launchProd.button, .save.button, .deploy.button, .end.button, .endProd.button').hide();

                        $('#saleGroups').html(''); // clear sale groups again
                        // if there are no active sale groups
                        if(saleGroups.length === 0) {

                            // export button only shows if we have a valid sale
                            $(".export.button").css("display","none");

                            //saleTool.newSaleGroup();
                            var group = saleTool.saleGroup.make(styles, messages);
                            saleTool.saleGroup.modifyWithJson(group, saleTool.emptyGroupJson);
                            saleTool.refreshItemFields();

                            $('.launch.button').show();
                            if(prodEqualsQA) {                // not on integration or prod
                                // nothin
                            } else {                          // not on integration, but on prod
                                $(".endProd.button").show();
                            }

                            saleTool.buildOldSales(iframeTriplet);

                        } else { // if there are..
                            $(".export.button").css("display","inline");
                            for(var n in saleGroups) { //var g = saleGroups.data[n];
                                //var options = saleTool.getOptionsForSaleGroup(g, styles);
                                //saleTool.newSaleGroup(saleGroups);
                                var group = saleTool.saleGroup.make(styles, messages);
                                saleTool.saleGroup.modifyWithJson(group, saleGroups[n]);
                                saleTool.refreshItemFields();
                                group.find(".titleAbove").positionTitle();   // inserted to fix the titles on items (when there is an item in a loaded group)
                            }

                            $('.save.button, .end.button').show();
                            if(prodEqualsQA) {                         // On integration, on prod

                            } else if(productionConfig.length === 0) { // On integration, not on prod
                                $(".launchProd.button").show();

                            } else {                                   // QA is changed, production has old configuration
                                $(".saveProd.button").show();
                            }
                        }

                        if(productionConfig.length !== 0) {
                            $(".prodToggle").show();
                            for(var n in productionConfig) {
                                var group = saleTool.saleGroup.make(styles, messages, true);
                                saleTool.saleGroup.modifyWithJson(group, productionConfig[n]);
                                saleTool.refreshItemFields();
                                group.hide();
                            }
                        } else {
                            $(".prodToggle").hide();
                        }

                        // hide some payment methods for certain networks
                        saleTool.showPaymentMethodsForNetwork();

                        //$('#saleGroups .loadingImage').remove();
                    } catch(e) {
                        alert(e);
                        throw e;
                    }
                });
            } catch(e) {
                alert(e);
                throw e;
            }
        },

        emptyGroupJson: {
            showOverMain:true,
            prices: [{'default':true, originalPoints:''},{originalPoints:''}]
        },
        // copies a group without setting sale-specific information like ids, purchase restriction flags, and times
        modifyGroupJsonForMakingACopy: function(groupJson) {
            delete groupJson.id;
            delete groupJson.end;    // ..
            delete groupJson.start;  // modify time
            if(groupJson.options && groupJson.options.purchaseRestriction)
                delete groupJson.options.purchaseRestriction.flag; // make sure it uses a new flag
            for(var n in groupJson.prices) { var p = groupJson.prices[n];
                delete p.id;
            }

            return groupJson;
        },

        saleGroup: {
            equal: function(groupAJavascriptObject, groupBJavascriptObject) {
                var arrayToObj = function(arr) {
                    var obj = {};
                    for(var n=0; n<arr.length; n++) {
                        obj[arr[n]] = null;
                    }
                    return obj;
                };

                var keysToIgnore = arrayToObj(['status', "iframeTriplet"]);

                var equalValue = function(a,b) {
                    if(a instanceof Array) {
                        if(!(b instanceof Array) || a.length !== b.length) return false;
                        for(var n=0; n< a.length; n++) {
                            if(!equalValue(a[n], b[n])) return false;
                        }
                        // else
                        return true;
                    } else if(typeof(a) === 'object' && a !== null) {
                        if(typeof(b) !== 'object') return false;

                        var keylist = [];
                        for(var n in groupAJavascriptObject) {
                            keylist.push(n);
                        }
                        for(n in groupBJavascriptObject) {
                            keylist.push(n);
                        }

                        for(n = 0; n<keylist.length; n++) {
                            var key = keylist[n];
                            if(key in keysToIgnore) continue;

                            if(!equalValue(a[key], b[key]))
                                return false;
                        }
                        // else
                        return true;
                    } else
                        return a==b;
                };

                return equalValue(groupAJavascriptObject, groupBJavascriptObject);

            },

            make: function(styles, messages, production) {
                if(production)
                    var prodClass = " prod";
                else
                    var prodClass = "";

                var stylesOptions=[];
                for(var n in styles) { var style = styles[n];

                    var properties = {css:style.css};
                    if(style.js !== undefined) {
                        properties['js'] = style.js;
                    }

                    var isDefault = '';
                    if(style['default'])
                        isDefault = ' selected="selected"';

                    var propertiesStringified = JSON.stringify(properties);

                    var newOption = $('<option'+isDefault+'>'+style.description+'</option>');
                        newOption.attr('value', propertiesStringified);
                        newOption.attr('title', propertiesStringified);
                    stylesOptions.push(newOption);
                }

                var createOptions = function(optionValues, intendedUse) {
                    var options = '';
                    for(var n in optionValues) { var h = optionValues[n];
                        if(h.use === intendedUse) {
                            options += '<option value="<%=PageMessage.localizedMessageSuffix%>'+h.name+'">'+h.message+'</option>';
                        }
                    }
                    return options;
                };

                var headerOptions = createOptions(messages, '<%=PageMessage.saleHeader%>');
                var messageOptions = createOptions(messages, '<%=PageMessage.saleMessage%>');

                var newGroup = $('<div class="saleGroup'+prodClass+'">'
                            //<div class="groupNumber">'+saleTool.saleGroup.number+'</div>                                          \
                          +'<input style="display:none;" class="id">'
                          +'<div class="activeText">Active</div> \
                            <div class="futureText">Future</div> \
                            <div class="prodText">Production</div> \
                            <div class="intText">Integration</div> \
                            <h3>Group <span class=groupLetter></span> <div class="removeGroup button">remove</div> <div class="cancelRemove button">cancel remove</div>\
                                <div class="copyGroup button" id="dup' + $(".saleGroup").length + '">Duplicate</div>\
                            </h3>  \
                             <ul class="errorMessages"></ul>                                                                                            \
                            <h4>Segmentation and Scheduling</h4>                                                         \
                                                                                                                         \
                            <select class="segmentationType titleAbove" title="Segmentation:">                           \
                                <option value="all">All Users</option>                           \
                                <option value="abTestGroups">AB Test Groups</option>               \
                            </select>                                                                                       \
                                                                                                                             \
                            <input type="text" class="abTestName titleAbove" title="AB Test Name:" value=""> \
                            <input type="text" class="abTestValue titleAbove" title="AB Test Group:" value=""> \
                            <div class="abStatus"></div> \
                                                                                                                                        \
                            <input type="text" class="startDate timeField titleAbove" title="Start:" value="now">    \
                            <span class="startCalendar" style="cursor:pointer;"><img src="${nonVersionedStaticBaseUrl}/scripts/cal.gif"></span>           \
                            <input type="text" class="endDate timeField titleAbove" title="End:" value="">                  \
                            <span class="endCalendar" style="cursor:pointer;"><img src="${nonVersionedStaticBaseUrl}/scripts/cal.gif"></span><br>  \
                            <div id="calendarIframeDiv" style="display:none;"><iframe id="calendarIframe" height="235px"></iframe></div>     \
                            <div class="timeHelp toolTip">                                                                      \
                                Note: Times are in the format <code>YYYY-MM-DD HH:mm:ss</code> <b>in PST</b>,   \
                                    where HH is hours in 24-hour format.                                            \
                                There is also the special value "now".   \
                            </div>                                                                                    \
                            \
                            <div class="userTypeHelp toolTip">\
                                The userType field can be left blank to indicate no filters. If not left blank, the userType field should be a syntactically valid java boolean statement using the following variables:\
                                <ul><li>whale - is true if the player is a whale</li>\
                                    <li>payer - is true if the player is a payer</li>\
                                    <li>fbDirectPayer - is true if the player is a fbDirectPayer</li>\
                                    <li>amountSpent - value of amount of revenue we have currently received from the user on this app, must be used in conjuction with standard comparison operators (like < and >)\
                                    for example: !whale && amountSpent < 50</li> \
                        </ul>\
                                and the following function:\
                                <ul><li>flag(String flagName) - returns true if the player as that flag set</li>\
                                </ul>\
                                Normal boolean opperators can be used including &&, ||, and !.<br>\
                                <b>Example:</b> flag("mogBonus20120403") && !whale\
                            </div>     \
                            <input type="text" class="userType titleAbove" title="User Types:" value=""> \
                                 \
                            <h4>Modal Style and Messaging</h4>                                                           \
                                                                                                                            \
                            <select class="modalStyle titleAbove" title="Styling:"></select>                                                                                        \
                            <br> \
                                                            \
                            <select class="header longField titleAbove" title="Header:"> \
                                '+headerOptions+' \
                            </select>   \
                                \
                            <br>                                                                                                \
                                                            \
                            <select class="message messageField titleAbove" title="Message:"> \
                                '+messageOptions+' \
                            </select>   \
                                                                                                                                    \
                            <h4>Pricing</h4>                                                                                        \
                                                                                                                                    \
                            <select class="pricingType titleAbove" title="Type:">                                                   \
                                <option value="bonus">Bonus</option>                                                                \
                                <option value="normal">Normal</option>                                                              \
                                <option value="discount">Discount</option>                                                          \
                            </select>                                                                                               \
                                                                                                                                    \
                            <select class="purchaseRestriction titleAbove" title="Purchase Restriction:">                           \
                                <option value="<%=PaymentMapping.purchaseRestrictionFlags.single.name()%>">Can only purchase one option</option>                                        \
                                <option value="<%=PaymentMapping.purchaseRestrictionFlags.onePer.name()%>">Can purchase one of each</option>                                            \
                                <option value="none">Any amount</option>                                                                  \
                            </select>                                                                                               \
                            <input class="purchaseRestrictionFlag titleAbove" title="Purchase Restriction Flag:">\
                            <input class="titleAbove playspanCode" title="Playspan Code" style="display:none;">                        \
                                                                                                                                          \
                                                                                                                                          \
                            <br><div class="add button">Add Price Point</div>                                                           \
                                                                                            \
                            <br>                                                                     \
                                                                                                                                    \
                            <form>                                                                                                  \
                                <table class="pricesTable infoTable"><tbody>                                                            \
                                    <tr><th><span class="discount">New<br></span>Price</th> <th class="discount">Old<br>Price</th>            \
                                        <th><span class="bonus">New<br></span>Payout</th> <th class="bonus">Old<br>Payout</th> \
                                        <th>Item</th><th style="font-size: 9px;">Default</th>   \
                                    </tr>                                                                                            \
                                </tbody></table>                                                                                      \
                            </form>                                                                                                       \
                                                                                                                                        \
                            <h4>Payment Methods</h4>                                                                                    \
                                                                                                                                         \
                            <div class="paymentMethod fbCredits button">Facebook Credits <input type="checkbox"></div>       \
                            <div class="paymentMethod creditCard button">Credit Card <input type="checkbox"></div>            \
                            <div class="paymentMethod paypal button">Paypal <input type="checkbox"></div>                         \
                                                                                                                                         \
                        </div>');

                for(var n in stylesOptions) { var option = stylesOptions[n];
                    newGroup.find(".modalStyle").append(option);
                }

                $("#saleGroups").append(newGroup);
                saleTool.saleGroup.init(newGroup);
                saleTool.showPaymentMethodsForNetwork();

                return newGroup;
            },

            init: function(saleGroup) {
                if(saleGroup.data('initialized') === undefined) {  // if never been initialized
                    saleGroup.data('initialized', true);

                    var headerAndMessageComboBoxes = saleGroup.find('.header, .message');
                    headerAndMessageComboBoxes.comboBox();

                    saleGroup.find(".titleAbove").positionTitle('above', 'label');

                    // Pricing
                    saleGroup.find('.pricingType').trigger('change'); //initialize tables based on pricing type currently selected
                }

                // Segmentation and scheduling
                saleGroup.find('.segmentationType').trigger('change');    // init the segmentation fields
                saleGroup.find('.purchaseRestriction').trigger('change');    // init the include/exclude fields

                if(saleGroup.data('initializedActive') === undefined) { // never been initialized as active
                    if(saleGroup.hasClass('active') || saleGroup.hasClass('future')) {
                        saleGroup.data('initializedActive', true);

                        // modifiable inputs
                        saleGroup.find('.segmentationType, .abTestName, .abTestValue, .startDate, .endDate'
                                    +', .include, .exclude'
                                    +', .modalStyle, .header, .message, .pricingType, .purchaseRestriction'
                                    +', .pricesTable input'
                                    +', .paymentMethod.fbCredits input, .paymentMethod.creditCard input, .paymentMethod.paypal input'
                                    +', .pricesTable .default input'
                                    +', .itemInfo input'
                        ).modifiableInput();


                        saleGroup.find('.itemInfo input').modifiableInput(function(isOriginalValue) {
                            var item = $(this).closest('.item');
                            var allHaveOriginalValues = item.find('.modified').length == 0;

                            if(allHaveOriginalValues)
                                item.removeClass('modified');
                            else
                                item.addClass('modified');
                        });
                    }

                    saleTool.reLetterGroups();
                    saleTool.rebuildCalendars();
                    $(".pricesTable").reOddify();
                }
            },

            toJson: function(groupNode) {
                var properties = JSON.parse(groupNode.find('.modalStyle').val());

                var result = {
                    zone: $("#zone").val(),

                    header: groupNode.find('.header').val(),
                    message: groupNode.find('.message').val(),

                    showOverMain: $("#useOnMain").attr("checked")
                };

                var id = groupNode.find(".id").val();
                if(id !== '') result.id = id;   

                if(properties.css !== undefined) result.css = properties.css;
                if(properties.js !== undefined) result.js = properties.js;

                var startDate = jQuery.trim(groupNode.find('.startDate').val());
                    if(startDate === '') {startDate = 'now';}
                    result.start = startDate;

                var endDate = jQuery.trim(groupNode.find('.endDate').val());
                    if(endDate === '') {endDate = null;}
                    result.end = endDate;
                    if(groupNode.hasClass("modified")) { // this is true if the remove button was clicked
                        result.end = 'now';
                    }

                if(groupNode.find('.segmentationType').val() == 'abTestGroups') {
                    result.abTest = {name: groupNode.find('.abTestName').val(), variant: groupNode.find('.abTestValue').val()};
                } else {
                    result.abTest = null;
                }
                var purchaseRestriction = groupNode.find('.purchaseRestriction').val();
                if("none" !== purchaseRestriction) {
                    result.options = {purchaseRestriction: {type: purchaseRestriction}};
                    if("<%=PaymentMapping.purchaseRestrictionFlags.single.name()%>" == purchaseRestriction) {
                        var purchaseRestrictionFlag = groupNode.find('.purchaseRestrictionFlag').val();
                        if(purchaseRestrictionFlag != '')
                            result.options.purchaseRestriction.flag = purchaseRestrictionFlag;
                    }
                } else {
                    result.options = null;
                }

                var playspanCodeDom = groupNode.find('.playspanCode');

                if (playspanCodeDom.is(":visible") && playspanCodeDom.val() != "") {
                    result.playspanCode = playspanCodeDom.val();
                }

                // add payment methods
                var paymentMethodIsSelected = function(method) { 
                  return groupNode.find('.paymentMethod.'+method+' input').attr("checked");
                };

                var methods = ['fbCredits', 'creditCard', 'paypal'];
                for(var n in methods) {
                  var method = methods[n];
                  if(paymentMethodIsSelected(method)){
                    // special case...
                    var methodKey = method == 'fbCredits' ? 'facebookCredits' : method;
                    // set in data going to server, default to null
                    result[methodKey+"Partner"] =  saleTool.saleGroup.getDefaultPaymentMethod(method);
                  }
                }

                // add prices
                var prices = [];
                groupNode.find('.pricesTable .priceRow').each(function() {
                    var price = saleTool.saleGroup.price.toJson($(this), groupNode.find('.pricingType').val(), groupNode.find('.userType').val());
                    if($(this).hasClass("modified")) { // if price has been marked for removal
                        if(price.id) price.remove = true;    // mark price for removal (ignore if the price hasn't been saved at all)
                        else return; // don't add it at all
                    }

                    prices.push(price);
                });
                result.prices = prices;

                return result;
            },
            /*
             * Maintains mappings for payment partners per network.
             */
            getDefaultPaymentMethod: function(method){
              var network = $("#network").val();
              var map = {
                //platform defaults
                'facebook':'Facebook',
                'playdom':'Playspan',
                //per-method defaults
                'myspace.paypal':'Playspan',
                'myspace.creditCard':'GlobalCollect'
              };
              for (var k in map){
                if(k == network && map[network+'.'+method] == undefined){
                  // nothing more specific defined
                  return map[k];
                } else if(k == network+'.'+method){
                  return map[k];
                }
              }
              // catch tagged & hi5, in case they get popular again
              return 'GlobalCollect';
            },
            modifyWithJson: function(groupNode, obj) {
                if(obj.id !== undefined) {
                    groupNode.find('.id').resetOriginal(obj.id);

                    /* can't really do this until we figure out how to parse the time part of a date in javascript
                    var now = new Date();
                    if( (obj.start !== undefined || obj.end !== undefined)
                        && (obj.start === undefined || obj.start === null || now > toolJS.parseDate(obj.start))
                        && (obj.end === undefined || obj.end === null || now < toolJS.parseDate(obj.end))) {

                    instead do this:
                        */
                    if(obj.status == 'live') {
                        groupNode.addClass("active");
                    } else if(obj.status == 'future') {
                        groupNode.addClass("future");
                    }

                }

                if(obj.start !== undefined) groupNode.find('.startDate').resetOriginal(obj.start);
                if(obj.end !== undefined) groupNode.find('.endDate').resetOriginal(obj.end);

                var stylingProperties = {};
                if(obj.css !== undefined) stylingProperties.css=obj.css;
                if(obj.js !== undefined) stylingProperties.js=obj.js;
                groupNode.find('.modalStyle').resetOriginal(JSON.stringify(stylingProperties));

                if(obj.header !== undefined) groupNode.find('.header').resetOriginal(obj.header);
                if(obj.message !== undefined) groupNode.find('.message').resetOriginal(obj.message);

                if(obj.showOverMain !== undefined) $("#useOnMain").resetOriginal(obj.showOverMain);

                if(obj.abTest !== undefined && obj.abTest !== null) {                    
                    groupNode.find('.abTestName').resetOriginal(obj.abTest.name);
                    groupNode.find('.abTestValue').resetOriginal(obj.abTest.variant);
                    groupNode.find('.segmentationType').resetOriginal('abTestGroups');
                    groupNode.find('.segmentationType').change();
                }

                if(obj.options !== undefined) {
                    if(obj.options === null) {
                        groupNode.find('.purchaseRestriction').resetOriginal("none");
                        
                    } else {
                        var purchaseRestriction = obj.options.purchaseRestriction;
                        if(purchaseRestriction !== undefined) {
                            groupNode.find('.purchaseRestriction').resetOriginal(purchaseRestriction.type);
                            if(purchaseRestriction.flag && purchaseRestriction.type == "<%=PaymentMapping.purchaseRestrictionFlags.single.name()%>")
                                groupNode.find('.purchaseRestrictionFlag').val(purchaseRestriction.flag);
                        }
                    }
                }

                // payment methods

                var getPaymentMethod = function(method) { return groupNode.find('.paymentMethod.'+method+' input'); };
                var defaultNetworkMethod;

                var isPlayspan = false;

                if(obj.paypalPartner !== undefined) {
                    if(obj.paypalPartner === 'Playspan') {
                        isPlayspan = true;
                    }
                    defaultNetworkMethod = saleTool.saleGroup.getDefaultPaymentMethod('paypal');
                    if(obj.paypalPartner === defaultNetworkMethod) {
                      getPaymentMethod('paypal').resetOriginal(true);
                    }
                }
                if(obj.creditCardPartner !== undefined) {
                    if(obj.creditCardPartner === 'Playspan') {
                        isPlayspan = true;
                    }
                    defaultNetworkMethod = saleTool.saleGroup.getDefaultPaymentMethod('creditCard');
                    if(obj.creditCardPartner === defaultNetworkMethod) {
                      getPaymentMethod('creditCard').resetOriginal(true);
                    }
                }
                if(obj.facebookCreditsPartner !== undefined) {
                    defaultNetworkMethod = saleTool.saleGroup.getDefaultPaymentMethod('fbCredits');
                    if(obj.facebookCreditsPartner === defaultNetworkMethod) {
                      getPaymentMethod('fbCredits').resetOriginal(true);
                    }
                }

                if (isPlayspan) {
                    groupNode.find(".playspanCode").show();
                    if (obj.playspanCode !== undefined) {
                        groupNode.find(".playspanCode").val(obj.playspanCode);
                    }

                    <% if (request.getAttribute("toolAdminUser") == null || (Boolean)request.getAttribute("toolAdminUser") != true) {%>
                        groupNode.find(".playspanCode").attr("disabled","disabled")
                    <% } %>
                }

                if(obj.prices !== undefined) {
                    var arbitraryPrice = obj.prices[0];

                    var definedOriginalPoints = arbitraryPrice.originalPoints !== undefined && arbitraryPrice.originalPoints !== null;
                    var definedOriginalPrice = arbitraryPrice.originalPrice !== undefined && arbitraryPrice.originalPrice !== null;
                    if(!definedOriginalPoints && !definedOriginalPrice) groupNode.find('.pricingType').resetOriginal('normal');
                    else if(definedOriginalPoints) groupNode.find('.pricingType').resetOriginal('bonus');
                    else if(definedOriginalPrice) groupNode.find('.pricingType').resetOriginal('discount');

                    if(arbitraryPrice.userType !== undefined) groupNode.find('.userType').val(arbitraryPrice.userType);

                    var unusedPrices = $.extend(obj.prices, []); // copy
                    groupNode.find('.pricesTable .priceRow').each(function() {
                        var priceId = $(this).find('.hiddenInfo .priceId').val();

                        var applicablePriceIndex = null;
                        for(var n in obj.prices) { var price = obj.prices[n];
                            if(obj.prices[n].id === priceId) {
                                applicablePriceIndex = n;
                                break;
                            }
                        }

                        if(applicablePriceIndex !== null) {
                            saleTool.saleGroup.price.modifyWithJson($(this), obj.prices[applicablePriceIndex]);
                            unusedPrices.splice(applicablePriceIndex, 1);
                        }
                    });

                    for(var n in unusedPrices) { var price = unusedPrices[n];
                        var newRowToModify = saleTool.saleGroup.price.make();
                        saleTool.saleGroup.price.modifyWithJson(newRowToModify, price);
                        $(groupNode.find('.pricesTable tbody').get(0)).append(newRowToModify);
                        newRowToModify.trigger('init');
                    }

                    groupNode.find('.pricesTable').reOddify();
                    groupNode.find('.pricingType').change(); // trigger the right price columns to hide
                }

                saleTool.saleGroup.init(groupNode);
            },

            price: {
                make: function() {
                    var domString = '<tr class="priceRow">'
                                +'<td class="price"><input type="text" class="numberField" value=""></td>'
                                +'<td class="oldPrice discount"><input type="text" class="numberField" value=""></td>'
                                +'<td class="payout"><input type="text" class="numberField" value=""></td>'
                                +'<td class="oldPayout bonus"><input type="text" class="numberField" value=""></td>'
                                +'<td class="item closed"><span class="image emptyText">none</span>'
                                    +'<div class="itemInfo">'
                                        +'<input style="display:none;" class="choiceId numberField titleAbove" title="Choice Id:" type="text" value="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                        +'<input class="itemName mediumField titleAbove" title="Item name:" type="text" value=""><br>'
                                        +'<input class="imageUrl titleAbove" title="Image:" type="text" value="">'
                                        +'<div class="upload button small">Upload</div><br>'
                                        +'<table class="itemTable infoTable"><tbody>'
                                        +'<tr><th>Item ID</th><th class="itemTransactionApi">Category</th><th>Parameters</th></tr>'
                                        +'</tbody></table>'
                                        +'<div class="addItem button small">Add Item</div>'
                                        +'<br>ToolTip Image:<br>'
                                        +'<input class="itemToolTip" type="text" value="">'
                                        +'<div class="toolTipUpload button small">Upload</div><br>'
                                        +'X <input class="toolTipX numberField"> Y <input class="toolTipY numberField"><br>'
                                    +'</div>'
                                +'</td>'
                                +'<td class="default"><input type="radio" name="defaultSelected"></td>'
                                +'<td class="nocell"><div class="remove button">Remove</div><div class="cancelPriceRemove button">Cancel</div></td>'
                                +'<td class="hiddenInfo" style="display:none;">'
                                   +'<input class="priceId">'
                                +'</td>';
                            +'</tr>';
                    return $(domString);
                },

                toJson: function(row, pricingType, userType) {
                    var pricePoint = {
                        //addFlags:

                        points: row.find('.payout input').val(),
                        price: row.find('.price input').val(),
                        "default": row.find('.default input').attr("checked")
                    };

                    var id = row.find('.priceId').val();
                    if(id !== '') pricePoint.id = id;  

                    if(userType == '') userType = null;                    
                    pricePoint['userType'] = userType;

                    if(pricingType === 'bonus') {
                        pricePoint.originalPoints = row.find('.oldPayout input').val();
                        pricePoint.originalPrice = null;
                    }
                    if(pricingType === 'discount') {
                        pricePoint.originalPrice = row.find('.oldPrice input').val();
                        pricePoint.originalPoints = null;
                    }
                    if(pricingType === 'normal') {
                        pricePoint.originalPrice = null;
                        pricePoint.originalPoints = null;
                    }

                    var choiceId = row.find('.item .choiceId').val();
                    if('' !== row.find('.item .itemName').val()) { // there's some items
                        var items = [];
                        row.find('.item .itemTable tr').each(function() {
                            var itemIdentifier = $(this).find('.itemIdentifier').val();
                            if(itemIdentifier !== undefined) items.push(saleTool.saleGroup.item.toJson($(this)));
                        });

                        pricePoint.itemSet = {
                            id: choiceId,
                            title: row.find('.item .itemName').val(),
                            image: row.find('.item .imageUrl').val(),
                            items: items,
                            toolTip: row.find('.item .itemToolTip').val(),
                            toolTipX: row.find(".item .toolTipX").val(),
                            toolTipY: row.find(".item .toolTipY").val()
                        };
                    } else if(choiceId !== '') { // items were removed
                        pricePoint.itemSet = null;
                    }

                    return pricePoint;
                },

                modifyWithJson: function(row, priceObj) {
                    if(priceObj.id !== undefined) row.find('.priceId').resetOriginal(priceObj.id);

                    if(priceObj.points !== undefined) row.find('.payout input').resetOriginal(priceObj.points);
                    if(priceObj.price !== undefined) row.find('.price input').resetOriginal(priceObj.price);
                    if(priceObj["default"] !== undefined) row.find('.default input').resetOriginal(priceObj["default"]);

                    //if(priceObj.addFlags !== undefined) { ?? }

                    if(priceObj.originalPoints !== undefined) row.find('.oldPayout input').resetOriginal(priceObj.originalPoints);
                    if(priceObj.originalPrice !== undefined) row.find('.oldPrice input').resetOriginal(priceObj.originalPrice);

                    if(priceObj.itemSet !== undefined) {
                        if(priceObj.itemSet.id !== undefined) row.find(".item .choiceId").resetOriginal(priceObj.itemSet.id);
                        if(priceObj.itemSet.title !== undefined) row.find('.item .itemName').resetOriginal(priceObj.itemSet.title);
                        if(priceObj.itemSet.image !== undefined) row.find('.item .imageUrl').resetOriginal(priceObj.itemSet.image);
                        if(priceObj.itemSet.toolTip !== undefined) row.find('.item .itemToolTip').resetOriginal(priceObj.itemSet.toolTip);
                        if(priceObj.itemSet.toolTipX !== undefined) row.find(".item .toolTipX").resetOriginal(priceObj.itemSet.toolTipX);
                        if(priceObj.itemSet.toolTipY !== undefined) row.find(".item .toolTipY").resetOriginal(priceObj.itemSet.toolTipY);

                        if(priceObj.itemSet.items !== undefined) { var items = priceObj.itemSet.items;

                            var itemRows = row.find('.item .itemTable tr');
                            for(var n in items) { var item = items[n];
                                var matchingRow = null;
                                itemRows.each(function() { var itemRow = $(this);
                                    var itemId = itemRow.find('.itemId').val();
                                    if(item.id === itemId) {
                                        matchingRow = itemRow;
                                    }
                                });

                                if(matchingRow === null) { // make a new one
                                    var itemNode = row.find('.item');
                                    rowToModify = saleTool.saleGroup.item.make();
                                    saleTool.refreshItemFields();
                                    itemNode.find('.itemTable tbody').append(rowToModify);
                                    itemNode.removeClass("closed");
                                    //itemNode.find(".titleAbove").positionTitle();
                                }

                                saleTool.saleGroup.item.modifyWithJson(rowToModify, item);
                            }
                        }
                    }
                }
            },

            item: {
                make: function() {
                    var domString = '<tr><td><input class="itemIdentifier short small field" type="text" value=""></td>'
                               +'<td class="itemTransactionApi"><input class="itemCategory short small field" type="text" value=""></td>'
                               +'<td><input class="itemParameters short small field" type="text" value=""></td>'
                               +'<td><input style="display:none;" class="itemId" type="text" value=""></td>'
                            +'</tr>';
                    return $(domString);
                },

                toJson: function(itemNode) {
                    var item = {
                        identifier: itemNode.find('.itemIdentifier').val()
                    };

                    var id = itemNode.find('.itemId').val();
                    if(id !== '') {
                        item.id = id;
                        if(item.identifier == '') { // item was removed
                            item.remove = true;
                        }
                    }

                    if (itemNode.find('.itemParameters').val() == '""') { // i guess this is correcting some weird bug?
                        itemNode.find('.itemParameters').val('');
                    }
                    if(itemNode.find('.itemParameters').val() !== '') item.parameters = JSON.parse(itemNode.find('.itemParameters').val());
                    if(itemNode.find('.itemCategory').val() !== '') item.category = itemNode.find('.itemCategory').val();

                    return item;
                },

                modifyWithJson: function(row, itemObj) {
                    if(itemObj.id !== undefined) row.find('.itemId').resetOriginal(itemObj.id);
                    if(itemObj.identifier !== undefined) row.find('.itemIdentifier').resetOriginal(itemObj.identifier);
                    if(itemObj.parameters !== undefined) {
                        if(itemObj.parameters === null) row.find('.itemParameters').resetOriginal('');
                        else row.find('.itemParameters').resetOriginal(JSON.stringify(itemObj.parameters));
                    }

                    if(itemObj.category !== undefined) {
                        if(itemObj.category === null) row.find('.itemCategory').resetOriginal('');
                        else row.find('.itemCategory').resetOriginal(itemObj.category);
                    }
                }
            }
        },

        ldapMonetizationApiRequest: function(action, data, apiUrl) {
            var saleApiUrl = typeof apiUrl !== 'undefined' ? apiUrl : "/api/sale";
            <%if (request.getParameter("hash") != null) {%>
                var ldapParameters = {
                    requester: '<%=request.getParameter("username")%>',
                    hash: '<%=request.getParameter("hash")%>',
                    expires: '<%=request.getParameter("expire_by")%>',
                    roles: <%=request.getAttribute("rolesJson")%>
                };
            <%} else {%>
                var ldapParameters = {};
            <% }%>

            var now = new Date();
            var timestamp = Math.floor((now.getTime() + now.getTimezoneOffset())/1000);
            var r = toolJS.jsonPost(saleApiUrl/*+'/'+action+'/1'*/,
                                    jQuery.extend(ldapParameters, {system: 'monetization', apiName: action, t: timestamp}, 
                                    data));
            if(r.result !== 'success') {
                r.toString = function() {
                    return r.message;
                };
                throw r;
            }

            return r;
        },


        unitTests: function() {
            /*var successes = 0;
            var failures = 0;
            var exceptions = 0;

            try {
                var assert = function(truthity) {
                    if(truthity) {
                        successes++;
                    } else {
                        failures++;
                    }
                };

                var o = { a:2, b:3 };
                assert(saleTool.getItemsRange(o, 'a','b').equals(new JS.Set([2,3])));
                o = { a:22, c:25 };
                assert(saleTool.getItemsRange(o, 'a','c').equals(new JS.Set([22,23,24,25])));

                var output = saleTool.groupList([{a:1, b:2}, {a:1, c:2}, {a:1, b:2}, {a:1, b:2, c: 3}], function(r, i) {
                    return r.i.a === i.a && r.i.b===i.b;

                }, function(i) {
                    return {i:i, c:1};
                }, function(r, i) {
                    r.c++;
                });

                assert(output.length === 2);
                assert(output[0].c===3);
                assert(output[0].i.a===1 && output[0].i.b===2);
                assert(output[1].c===1);
                assert(output[1].i.a===1 && output[1].i.c===2);


                var list =
                [   {a: 1, b: 2, start: 3, end: 3},
                    {a: 1, b: 2, start: 4, end: 4}
                ];

                var getMember = function(o,m) {
                    var result = o;
                    var parts = m.split('.');
                    for(var n in parts) {
                        result = result[parts[n]];
                    }
                    return result;
                };

                assert(toolJS.compareObjectMembers(list[0], list[1], ['a','b']));

                //output = saleTool.buildRangeList(list, 'start','end', ['a','b']);
                //assert(output.length===1);
                //assert(output[0].range.equals(new JS.Set([3,4])));


                var a = [{range: new JS.Set([1,2]), info: {a: 'a'}}];
                var b = [{range: new JS.Set([1,2]), info: {a: 'a'}}];
                //var newGroup = saleTool.addSaleGroupInfo(a, b, 'b', {name: 'a', value: 'a'});

                //assert(newGroup.length === 1);

                var priceSets = [
                    [{a:1, b:2, c:3, startRange:3, endRange: 4}],
                    [{a:1, b:2, c:56, startRange: 5, endRange: 5}]
                ];
                //var groups = saleTool.combinePriceListIntoGroupings(priceSets, 'startRange', 'endRange', ['a','b']);
                //assert(groups.length ===1);

                priceSets = [[{abtestName:"test", abtestValue:"a", bestValue:false, displayType:"excludeUserCategoryFlag",
                            displayTypeEnum:"excludeUserCategoryFlag", displayTypeExcludedUserCategoryFlag:"caveB20111212_1416",
                            displayTypeIncludedUserCategoryFlag:"", endRange:9, endTime:null, excludeDisplayTypes:"", id:17372,
                            iframeId:{app:"cave", currency:"hard", network:"facebook", zone:"bonus"}, inDialog:0, ipCountry:"",
                            listOfExcludeDisplayTypes:[], menuTemplate:"", onlyOnBonusModal:false, ordering:0, originalPoints:3,
                            originalPrice:0, points:2, price:1, retailChoice:null, retailItemsChoiceId:0, selectAfterBonusModalCloses:false,
                            selected:1, showBonus:false, startRange:0, startTime:"2011-12-12 14:33:49"}], [{abtestName:"test", abtestValue:"b",
                            bestValue:false, displayType:"excludeUserCategoryFlag", displayTypeEnum:"excludeUserCategoryFlag",
                            displayTypeExcludedUserCategoryFlag:"caveB20111212_1524", displayTypeIncludedUserCategoryFlag:"", endRange:9, endTime:null,
                            excludeDisplayTypes:"", id:17373, iframeId:{app:"cave", currency:"hard", network:"facebook", zone:"bonus"}, inDialog:0,
                            ipCountry:"", listOfExcludeDisplayTypes:[], menuTemplate:"", onlyOnBonusModal:false, ordering:0, originalPoints:1232, originalPrice:0,
                            points:23123, price:112321, retailChoice:null, retailItemsChoiceId:0, selectAfterBonusModalCloses:false, selected:1, showBonus:false,
                            startRange:0, startTime:"2011-12-12 15:24:20"}]];
                //groups = saleTool.combinePriceListIntoGroupings(priceSets, 'startRange', 'endRange', ['abtestName', 'abtestValue']);
                //assert(groups.length ===2);

                //assert(saleTool.getStringModRanges(new JS.Set([8,9,5])) === "5, 8-9");


            } catch(e) {
                exceptions = e;
                alert("Exception: "+e);
            }

            try {
                console.log("Successes: "+successes+", failures: "+failures+", and exeptions: "+exceptions);
            } catch(e) {
                // ignore
            }
            */
        },

        showPaymentMethodsForNetwork: function(){
          if($('#network').val() !== 'facebook') {
              $(".creditCard.button, .paypal.button").show();
              $(".fbCredits.button").hide();
              $(".fbCredits.button input").attr("checked", false);
              $(".playspanCode").show();
          } else {
              $(".fbCredits.button").show();
              $(".creditCard.button, .paypal.button").hide();
              $(".creditCard.button input, .paypal.button input").attr("checked", false);
              $(".playspanCode").hide();
          }
          
          $(".titleAbove").positionTitle();

          <% if (request.getAttribute("toolAdminUser") == null || (Boolean)request.getAttribute("toolAdminUser") != true) {%>
              $(".playspanCode").attr("disabled","disabled");
          <% } %>
        }

    };



    saleTool.MonetizationApiRequest = proto({
        make: function(system, requester, comment, info, jsonp) {
            this.request = {};

            var now = new Date();
            var timestamp = Math.floor((now.getTime() + now.getTimezoneOffset())/1000);

            this.jsonp = jsonp;
            this.request.system = system;
            this.request.requester = requester;
            this.request.t = timestamp;
            if(comment!==undefined) {this.request.comment = comment;}
            if(info!==undefined) {this.request.info = info;}
        },
        send: function(saleApiUrl, callback) {
            if(this.jsonp)
                var data = {request: this.getRequest()};
            else
                var data = this.getRequest();
            return this.sendRaw(saleApiUrl, data, callback);
        },
        getRequest: function() {
            return JSON.stringify(this.request);
        },
        // private
        sendRaw: function(saleApiUrl, data, callback) {
            if(this.jsonp)
                return toolJS.jsonpRequest(saleApiUrl, data, callback);
            else
                return JSON.parse(toolJS.postRequest(saleApiUrl, data));
        }
    });

    saleTool.AuthenticatedMonetizationApiRequest = proto({ mix: [saleTool.MonetizationApiRequest],
        make: function(system, requester, comment, info, key, jsonp) {
            saleTool.MonetizationApiRequest.make(this, system, requester, comment, info, jsonp);
            this.key = key;
        },

        extend: {
            getRequest: function(superMethod) {
                var requestString = superMethod.call(this);
                var hash = this.hash(this.key, requestString);
                return hash+" "+requestString;
            }
        },
        // private
        hash: function(key, requestString) {
            if(key === undefined) throw "Key is undefined";
            return CryptoJS.HmacSHA1(requestString, key).toString(CryptoJS.enc.Base64);
        }
    });




</script>



</body>

</html>
