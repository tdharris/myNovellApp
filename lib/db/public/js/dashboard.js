jQuery(function($) {
    var panelList = $('#draggablePanelList');

    panelList.sortable({
        // Only make the .panel-heading child elements support dragging.
        // Omit this to make then entire <li>...</li> draggable.
        handle: '.panel-heading',
        update: function() {
            $('.panel', panelList).each(function(index, elem) {
                var $listItem = $(elem),
                    newIndex = $listItem.index();

                // Persist the new indices.
            });
        }
    });
});
// jQuery.ajax = (function(_ajax){

//     var protocol = location.protocol,
//         hostname = location.hostname,
//         exRegex = RegExp(protocol + '//' + hostname),
//         YQL = 'http' + (/^https/.test(protocol)?'s':'') + '://query.yahooapis.com/v1/public/yql?callback=?',
//         query = 'select * from html where url="{URL}" and xpath="*"';

//     function isExternal(url) {
//         return !exRegex.test(url) && /:\/\//.test(url);
//     }

//     return function(o) {

//         var url = o.url;

//         if ( /get/i.test(o.type) && !/json/i.test(o.dataType) && isExternal(url) ) {

//             // Manipulate options so that JSONP-x request is made to YQL

//             o.url = YQL;
//             o.dataType = 'json';

//             o.data = {
//                 q: query.replace(
//                     '{URL}',
//                     url + (o.data ?
//                         (/\?/.test(url) ? '&' : '?') + jQuery.param(o.data)
//                     : '')
//                 ),
//                 format: 'xml'
//             };

//             // Since it's a JSONP request
//             // complete === success
//             if (!o.success && o.complete) {
//                 o.success = o.complete;
//                 delete o.complete;
//             }

//             o.success = (function(_success){
//                 return function(data) {

//             if (_success) {
//                 // Fake XHR callback.
//                 var obj = {
//                     responseText: (data.results[0] || '')
//                         // YQL screws with <script>s
//                         // Get rid of them
//                         .replace(/<script[^>]+?\/>|<script(.|\s)*?\/script>/gi, '')
//                 };  
//                 $.extend(obj,{
//                     isResolved: function() { return true; },
//                     done: function() { return true; }
//                 });

//                 _success.call(this, obj, 'success');
//             }

//                 };
//             })(o.success);

//         }

//         return _ajax.apply(this, arguments);

//     };

// })(jQuery.ajax);

// $(function(){
//  $('a').each(function() {
//      validateURL(this);
//  });

//  function validateURL(el) {
//      var $el = $(el);

//      $.ajax({
//          type: 'GET',
//          url: $el.attr('href'),
//          success: function() {
//                 // page exists - addClass "active" to this
//                 $el.addClass('active');
//                 console.log(arguments);
//          },
//          error: function() {
//                 // page does not exist - addClass "inactive" to this
//                 $el.addClass('inactive');
//                 console.log(arguments);
//          }
//      });
//  };
// });
