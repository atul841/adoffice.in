function add_to_cart(item_type, item_id, cat_id, type_id)
{
    //alert(item_type+'-'+item_id+'-'+cat_id+'-'+type_id)
    if(item_id && type_id != 4)
    {
        $.ajax({
           url: '',
           data: 'mode=add&item_id=' + item_id + '&cat_id=' + cat_id + '&type_id='+type_id+'&item_type=' + item_type,
           success: function(data) {
                $('#cart_count').html('(' + data + ')');
				$('#cart_countx').html('(' + data + ')');
				$('#cart_count2').html(data);
				$('#cart_count2x').html(data);
				cart_tooltip();
                /* $('#cart_'+item_type+'_'+item_id).html('<a href="javascript:void(null);"  class="effect effect-removecart" onclick="remove_from_cart(\''+item_type+'\','+item_id+','+cat_id+','+type_id+')">Remove from cart</a>');*/
		if($('#cart_'+item_type+'_'+item_id+'_'+type_id).length>0){
		$('#cart_'+item_type+'_'+item_id+'_'+type_id).html('<a href="javascript:void(null);"  class="effect effect-removecart" onclick="remove_from_cart(\''+item_type+'\','+item_id+','+cat_id+','+type_id+')">Remove from cart</a>');

		}

		if($('#cart_'+item_type+'_'+item_id).length>0){
		$('#cart_'+item_type+'_'+item_id).html('<a href="javascript:void(null);"  class="effect effect-removecart" onclick="remove_from_cart(\''+item_type+'\','+item_id+','+cat_id+','+type_id+')">Remove from cart</a>');

		}



                $("#proceedtocomposeadtop").show();
                $("#proceedtocomposeadbottom").show();
           },
           type: 'POST'
        });
    } else {
        document.getElementById("cart_count").value = 0;
    }

}

function remove_from_cart(item_type, item_id, cat_id, type_id)
{
    if(item_id)
    {
        $.ajax({
           url: 'https://www.bookmyad.com/cart.php',
           data: 'mode=remove&item_id=' + item_id + '&cat_id=' + cat_id + '&type_id='+type_id+'&item_type=' + item_type,
           success: function(data) {
                $('#cart_count').html('(' + data + ')');
				$('#cart_countx').html('(' + data + ')');
				$('#cart_count2').html(data);
				$('#cart_count2x').html(data);
                cart_tooltip();
                
		if($('#cart_'+item_type+'_'+item_id).length>0){
			$('#cart_'+item_type+'_'+item_id).html('<a href="javascript:void(null);"  class="effect effect-addcart" onclick="add_to_cart(\''+item_type+'\','+item_id+','+cat_id+','+type_id+')">Add to cart</a>');
			}

if($('#cart_'+item_type+'_'+item_id+'_'+type_id).length>0){
			$('#cart_'+item_type+'_'+item_id+'_'+type_id).html('<a href="javascript:void(null);"  class="effect effect-addcart" onclick="add_to_cart(\''+item_type+'\','+item_id+','+cat_id+','+type_id+')">Add to cart</a>');
			}


                if(location.pathname.split("/").slice(-1) == 'compose_ad.php') {
                    //alert('item_'+item_type+'_'+item_id);
                    //$('#item_'+item_type+'_'+item_id).remove();
                    window.location = "https://www.bookmyad.com/compose_ad.php";
                } else if(location.pathname.split("/").slice(-1) == 'compose_single_ad.php') {
                    window.location = "https://www.bookmyad.com/compose_single_ad.php";
                 } else if(location.pathname.split("/").slice(-1) == 'compose_multi_ad.php') {
                    window.location = "https://www.bookmyad.com/compose_multi_ad.php";
                } else if(location.pathname.split("/").slice(-1) == 'summary.php' && 
                        data != '0') {
                    window.location = "https://www.bookmyad.com/summary.php";
					/*
					$('#item_'+item_type+'_'+item_id).remove();
                    calculate_total_cost();
					*/
                }

                if(data == '0') {
                    $("#proceedtocomposeadtop").hide();
                    $("#proceedtocomposeadbottom").hide();
                    if((location.pathname.split("/").slice(-1) == 'compose_ad.php') ||
                        (location.pathname.split("/").slice(-1) == 'compose_single_ad.php') || 
                        (location.pathname.split("/").slice(-1) == 'compose_multi_ad.php') ||
                        (location.pathname.split("/").slice(-1) == 'summary.php')) {
                        window.location = "https://www.bookmyad.com/index.php";
                    }
                } else {
                    if(location.pathname.split("/").slice(-1) == 'summary.php') {
                        //window.location = "https://www.bookmyad.com/summary.php";
                    }
                } 
           },
           type: 'POST'
        });
    } else {
        document.getElementById("cart_count").value = 0;
    }

}

function cart_tooltip()
{
    $.ajax({
        url: 'https://www.bookmyad.com/ajax/cart_tooltip.php',
        data: 'mode=removeall',
        error: function() {
            $('#drop').html('<option>An error has occurred</option>');
			$('#dropx').html('<option>An error has occurred</option>');
        },
        success: function(data) {
			$('#drop').html(data);
			$('#dropx').html(data);
       },
       type: 'POST'
    });

}

function remove_all_from_cart()
{
    $.ajax({
       url: 'https://www.bookmyad.com/cart.php',
       data: 'mode=removeall',
       success: function(data) {
            $('#cart_count').html('(' + data + ')');
			$('#cart_count2').html(data);
			$('#cart_countx').html('(' + data + ')');
			$('#cart_count2x').html(data);
            cart_tooltip();
            $("#proceedtocomposeadtop").hide();
            $("#proceedtocomposeadbottom").hide();
            window.location = "https://www.bookmyad.com/newspapers.php";
       },
       type: 'POST'
    });

}

function calculate_total_cost()
{
    $.ajax({
       url: 'https://www.bookmyad.com/ajax/calculate_total_cost.php',
       data: 'mode=removeall',
       success: function(data) {
            var res = new Array();
            res = data.split("_");
 
            $('#basic_rate').html(res[0]);
            $('#service_tax').html(res[1]);
            $('#total_cost').html(res[2]);
       },
       type: 'POST'
    });

}

$(document).ready(function() {
        $.ajax({
           url: '',
           data: 'get_cart_count=1',
           success: function(data) {
              $('#cart_count').html('(' + data + ')');
			  $('#cart_countx').html('(' + data + ')');
			  $('#cart_count2').html(data);
			  $('#cart_count2x').html(data);
              if(data == 0) {
                $("#proceedtocomposeadtop").hide();
                $("#proceedtocomposeadbottom").hide();
              }
           },
           type: 'POST'
        });

});
