function biseccion (expr,xa,xb,n,){
    var expr= document.getElementById('funcion').value;
    var xa= parseFloat(document.getElementById('xa').value);
    var xb= parseFloat(document.getElementById('xb').value);
    var n = parseFloat(document.getElementById('n').value);
    var x = 0, xr = 0, va = 0, fxa = 0, fxb = 0, fxr = 0, error = 0, i = 0, f = 0;
    var a = xa, b = xb, xReal;
    var w = window.open("", "resultado","resizable,menubar,scrollbars,width=800,height=600",true);

    $('#canva').remove();
    $( ".contenedor" ).append("<div id='canva'><canvas id='migrafica'></canvas></div>");
    const $grafica = document.getElementById("migrafica");
    
    writeDocHead(w, expr);

    var equis={
        type: 'line',
        label:"f(x)",
        data: [{}],
        backgroundColor:"green",
        borderColor: "green",
        borderWidth: 3
    }; 

    var rangos={
        type: 'scatter',
        label:"xa/xb",
        data: [{}],
        backgroundColor:"red",
        borderColor: "red",
        borderWidth: 10
    };
    
    var xreal={
        type: 'scatter',
        label:"X",
        data: [{}],
        backgroundColor:"blue",
        borderColor: "blue",
        borderWidth: 10
    };

    rangos.data.push({x:xa,y:fxa});
    rangos.data.push({x:xb, y:fxb});
    do
    {
        console.log(a);
        console.log(b);
        va = xr;
        xr = (a + b) / 2;
        console.log(xr);
        fxa = math.evaluate(expr, {x : a});
        fxr = math.evaluate(expr, {x : xr});
        equis.data.push({x:xr, y:fxr});
        fxb = math.evaluate(expr, {x : b});
        f = fxa * fxr;
        error = Math.abs(((xr - va) / xr) * 100);
        writeTableLine(w,i,a,b,xr,fxa,fxr,error);
        if (f > 0)
            a = xr;
        if (f < 0)
            b = xr;
        i++;      
    } while (error > n);
    xreal.data.push({x:xr, y:fxr});
    writeDocEnd(w);
    x = va;
    xReal = Math.round(x);
    $('#xReal').text(xReal);

    document.getElementById('resultado').value = x;
    document.getElementById('iteraciones').value = i;
    document.getElementById('error').value = error;

    new Chart ($grafica,{
        data:{
            labels: [],
            datasets: [equis,rangos,xreal]
            },
        options: {
            scales: {
                x: {
                type: 'linear',
                position: 'bottom'
                }
            }
        }
    }) 

}

function limpiar (){
    document.getElementById('funcion').value="";
    document.getElementById('xa').value=""; 
    document.getElementById('xb').value="";
    document.getElementById('n').value="";
    document.getElementById('resultado').value="";
    document.getElementById('iteraciones').value="";
    document.getElementById('error').value="";
    $('#canva').remove();
    $( ".contenedor" ).append("<div id='canva'><canvas id='migrafica'></canvas></div>");
    $('#xReal').text("X");
}

function writeTableLine(window ,i,a,b,xr,fxa,fxr,error) {
    with (window.document) {
       writeln("<tr>");
       writeln("<td>" + i);
       writeln("<td>" + a);
       writeln("<td>" + b);
       writeln("<td>" + xr);
       writeln("<td>" + fxa);
       writeln("<td>" + fxr);
       writeln("<td>" + error);
    };
 }

 function writeDocHead(window, expresion) {
    with (window.document) {
       writeln("<table border=1>");
         writeln("<tr>");
           writeln("<th colspan=7>" + "Metodo de Biseccion");
         writeln("<tr>");
           writeln("<th>i");
           writeln("<th>xa");
           writeln("<th>xb");
           writeln("<th>xr");
           writeln("<th>fxa");
           writeln("<th>fxr");
           writeln("<th>error");
    }
 }

 function writeDocEnd(window) {
    with (window.document) {
       window.document.writeln("</table>");
       window.document.close();
    }
 }