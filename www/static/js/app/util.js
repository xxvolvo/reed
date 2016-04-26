if (typeof jQuery === "undefined") {
  throw new Error("Reed requires jQuery");
}
//定义主对象
$.Reed={};

//定义路由器
$.Reed.router={
  options:{},
  init:function(selector){
    this.options.selector=selector;
  },
  link:function(url,name,title){
    var height=$(this.options.selector).closest(".content-wrapper").height()-70;
    var title_container=$(this.options.selector).children(".nav.nav-tabs")[0];
    var content_container=$(this.options.selector).children(".tab-content")[0];
    var target_id="tab_target_"+name;
    var current_title=$(title_container).find("a[href='#"+target_id+"']");
    if(current_title.length==0){//需要新增
      var li=$("<li>");
      var a=$("<a>").attr("href","#"+target_id).attr("data-toggle","tab").html(title);
      $(title_container).append(li.append(a));
      var div=$("<div>").addClass("tab-pane").attr("id",target_id).height(height+"px");
      var iframe=$("<iframe>").attr("src",url).attr("height","100%").attr("width","100%").attr("id","iframe_"+name).attr("frameborder","no").attr("name","iframe_"+name);
      $(content_container).append(div);
      div.append(iframe)

      //$(content_container).append(div.append('sdfd'));
      a.tab('show');
    }else{//刷新
      current_title.tab('show');
      document.getElementById("iframe_"+name).contentWindow.location.reload(true)
    }
  },
  iframe:function(){
    var _iframe={};
    _iframe.params={};
    _iframe.init=()=>{
      _iframe.location=window.location.pathname ;
      _iframe.params.page=1;
    };
    _iframe.addParam=(param)=>_iframe.params=$.extend(_iframe.params,param);
    _iframe.setParam=(param)=>_iframe.params=param;
    _iframe.refresh=(param,replaceParam)=>{
      if(param){
        if(replaceParam){
          _iframe.setParam(param);
        }
        else{
          _iframe.addParam(param);
        }
      }
      if(_iframe.params&&_iframe.params!=={}){
        var paramStr=$.Reed.util.parseParam(_iframe.params);
        window.location.href=_iframe.location+"?"+paramStr;
      }else{
        window.location.reload();
      }
    };
    _iframe.init();
    return _iframe;
  }
};

$.Reed.dt={
  loadData:function(url,selector){
    var thead=$(selector).children("thead");
    var meta=[];
    thead.find("th").each(function(index,ele){
      var options=$(ele).data("options");
      if(!options){
        console.log("缺少data-options");
        return;
      }
      meta.push(options);
    });

    $.get(url,null,function(r){
      var tbody=$(selector).children("tbody");
      tbody.empty();
      if(r.errno){
        alert(r.errmsg);
      }else{
        for(var i=0;i<r.data.length;i++){
          var item=r.data[i];
          var tr=$("<tr>");
          for (var index in meta) {
            var m=meta[index];
            var td=$("<td>");
            if(m.template){
              td.html(m.template.replace("{{"+m.field+"}}",item[m.field]));
            }else if(m.renderf){
              td.html(eval(m.renderf)(item[m.field]));
            }else{
              td.html(item[m.field]);
            }
            tr.append(td);
          }
          tbody.append(tr);
        }
      }
    },'json');
  },
  renderCheckbox(v){
    if(v===true){
      return '<i class="fa fa-check"></i>';
    }else{
      return '';
    }
  }
};

$.Reed.util={
  parseParam:function(param, key){
    var paramStr="";
    if(param instanceof String||param instanceof Number||param instanceof Boolean){
      paramStr+="&"+key+"="+encodeURIComponent(param);
    }else{
      $.each(param,function(i){
        var k=key==null?i:key+(param instanceof Array?"["+i+"]":"."+i);
        paramStr+='&'+$.Reed.util.parseParam(this, k);
      });
    }
    return paramStr.substr(1);
  }
}
