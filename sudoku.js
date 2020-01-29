//tanguy bulliard matricule:20126144


//code global
load("sudoku-hard.js");
load("sudoku-hard-c.js");



for (var k = 0; k <= 8; k++) {
		for (var m = 0; m <=8; m++) {
				if(typeof(grille[k][m]) === "undefined")
					grille[k][m] = " ";
		}	
};

for(i=0;i<9;i++){
	for(j=0;j<9;j++){
		if(grille[i][j]===" ")
			grille[i][j]=["1","2","3","4","5","6","7","8","9"];
		else{
			var troisième = [".",".",".",".",".",".",".",".","."];
			var k = grille[i][j];
			troisième[k-1]=k;
			grille[i][j]=troisième;
		}
	}
};



var display = function (){
	var grille2 = grille;
	for(var a=0;a<9;a++){
		for(var b=0;b<9;b++){
			var nbchiffre = 0;
			for(var k = 0;k<9;k++){
				if(grille2[a][b][k]!==".")
					nbchiffre+=1;
			}
			if (nbchiffre!==1)
				grille2[a][b]=" ";
			else if(nbchiffre===1){
				var val = 0;
				for (var k=0;k<9;k++){
					if (grille2[a][b][k]!==".")
						val = grille2[a][b][k];
                }
                grille2[a][b]=val;
				
			}
		}
	}
	var n = 0;
	var A_1D = function(j){
		var ARRAY_1D = [];
		for (var i = 0; i <= 2; i++) {
			if(i === 2)
				ARRAY_1D.push("|  " + (grille2[j].slice(0+3*i,3+3*i)).join("+  ") + "|");
			else
				ARRAY_1D.push("|  " + (grille2[j].slice(0+3*i,3+3*i)).join("+  "));
		}
		return ARRAY_1D.join("");
	}
	for (var i = 0;i <= 12; i++) { //Donne la bonne information selon la ligne
        var line = "";
		if(i%4 === 0)
			line += "  ---------   ---------   ---------"; //length de 35
		else if(i%4 !== 0){
			line += A_1D(n); //ici mettre les tableaux joined
			n += 1;
		}
        
		print(line);
	}
};

var detail = function(){
	var POSS = function(i,j){
 		var ligne = [];
		for (var p = 0; p < 9; p++) {
			var g = grille[i][p];
			if (p === 8)
				ligne.push("| " + (g.slice(0+3*j,3+3*j)).join("") + " ||");
			else if (p%3 === 0)
				ligne.push("|| " + (g.slice(0+3*j,3+3*j)).join("") + " ");
			else
				ligne.push("| " + (g.slice(0+3*j,3+3*j)).join("") + " ");
		}
		return ligne.join("");
	}
	var line = "";
	var m = 0;
	var n = 0;
	for (var i = 0;i <= 40; i++) { //Donne la bonne information selon la ligne
		if(i === 13 || i === 27)
			line = ""; //LENGTH DE 59
		else if (i === 0 || i === 12 || i === 14 || i === 26 || i === 28 || i === 40)
			line = "|+ ===   ===   === ++ ===   ===   === ++ ===   ===   === +|";
		else if (i === 4 || i === 8 || i === 18 || i === 22 || i === 32 || i === 36)
			line = "|| ---   ---   --- || ---   ---   --- || ---   ---   --- ||";
		else{
			if(n > 2)
				n = 0;
			line = POSS(Math.floor(m),n); //ici mettre les tableaux joined
			n += 1;
			m += 0.34;
		}
        
		print(line);
	}
};

var play = function(l,c,val){
	var nbF = 0;
	for(var k=0;k<9;k++){
		if(grille[l][c][k]!=="."){
			nbF += 1;
		}
	}
	var valF = 0;
	if(nbF===1){
		for(var k=0;k<9;k++){
			if(grille[l][c][k]!==".")
				valF = grille[l][c][k];
		}
		if (valF!==val)
			return "On ne peut placer cette valeur dans cette case"
	}
	else{
		var troisième = [".",".",".",".",".",".",".",".","."];
		troisième[val-1]=val;
		grille[l][c]=troisième;
	}
};

var stat = function(debug){

	if (debug===true){
		var nbP = 0; //pour le nb de possibilités totales
		var ouvertes = 0; //pour le nb de cases ouvertes
		var nP = [0,0,0,0,0,0,0,0,0]; //pour le nb de cases de n possibilités
		for(i=0;i<9;i++){
			for(j=0;j<9;j++){
				var nbO = 0; //pour le nb de possibilités pour les cases ouvertes
				for(k=0;k<9;k++){
					if(grille[i][j][k]!=="."){
						nbP += 1;
						nbO += 1;
					}
				}
				if(nbO===1){
					ouvertes += 1;
				}
				for(z=0;z<=9;z++){
					if(nbO===z)
						nP[z-1]+=1;
				}

			}
		}
		return "Le nombre de possibilités est: "+nbP+" Le nombre de cases ouvertes est: "+ouvertes+" Le nombre de cases pour n possibilités est: "+nP
    }
	else if (debug===false){
		//nb de possibilités
        var nb=0;
		for(i=0;i<9;i++){
			for(j=0;j<9;j++){
				for(k=0;k<9;k++){
					
					if(grille[i][j][k]!==".")
						nb += 1;
				}
			}
		}
		return "Le nombre de possibilités est : "+nb	
	}	
};

var solve = function(debug){
	
	var nbferm = function(){
			var nb = 0;
	        var nbFe = 0;
	        for(var i=0;i<9;i++){
				for(var j=0;j<9;j++){
	                var nbFermees = 0;
					for(k=0;k<9;k++){
						if(grille[i][j][k]!=="."){
							nb += 1;
	                     nbFermees += 1;
	                    }
	                }
	                if (nbFermees===1)
	                    nbFe += 1;
				}
			}
			print("Le nombre de cases qui sont fermées suite à cette itération est : "+nbFe)
		}
	var résoudre = function(lig,col){
		var val = 0;
			for(var k=0;k<9;k++){
				if(grille[lig][col][k]!=="."){
					val = grille[lig][col][k];
                }
            }
					for(var l = 0;l<9;l++){//propagation sur la colonne
						grille[l][col][val-1]=".";
					}
					for(var c = 0;c<9;c++){//propagation sur la ligne
						grille[lig][c][val-1]=".";
					}
					if(lig%3===0){
						if(col%3===0){
							grille[lig+1][col+1][val-1]=".";
							grille[lig+2][col+1][val-1]=".";
							grille[lig+1][col+2][val-1]=".";
							grille[lig+2][col+2][val-1]=".";
						}
						else if(col%3===1){
							grille[lig+1][col-1][val-1]=".";
							grille[lig+2][col-1][val-1]=".";
							grille[lig+1][col+1][val-1]=".";
							grille[lig+2][col+1][val-1]=".";
						}
						else{
							grille[lig+1][col-1][val-1]=".";
							grille[lig+2][col-1][val-1]=".";
							grille[lig+1][col-2][val-1]=".";
							grille[lig+2][col-2][val-1]=".";
						}
					}
					else if(lig%3===1){
						if(col%3===0){
							grille[lig-1][col+1][val-1]=".";
							grille[lig-1][col+1][val-1]=".";
							grille[lig+1][col+2][val-1]=".";
							grille[lig+1][col+2][val-1]=".";
						}
						else if(col%3===1){
							grille[lig-1][col-1][val-1]=".";
							grille[lig-1][col-1][val-1]=".";
							grille[lig+1][col+1][val-1]=".";
							grille[lig+1][col+1][val-1]=".";
						}
						else{
							grille[lig-1][col-1][val-1]=".";
							grille[lig-1][col-1][val-1]=".";
							grille[lig+1][col-2][val-1]=".";
							grille[lig+1][col-2][val-1]=".";
						}
					}
					else{
						if(col%3===0){
							grille[lig-1][col+1][val-1]=".";
							grille[lig-1][col+1][val-1]=".";
							grille[lig-2][col+2][val-1]=".";
							grille[lig-2][col+2][val-1]=".";
						}
						else if(col%3===1){
							grille[lig-1][col-1][val-1]=".";
							grille[lig-1][col-1][val-1]=".";
							grille[lig-2][col+1][val-1]=".";
							grille[lig-2][col+1][val-1]=".";
						}
						else{
							grille[lig-1][col-1][val-1]=".";
							grille[lig-1][col-1][val-1]=".";
							grille[lig-2][col-2][val-1]=".";
							grille[lig-2][col-2][val-1]=".";
						}
					}
				}
		
		

	var continuation = function(){
		for(var i = 0;i<9;i++){
			for (var j = 0;j<9;j++){
				var nbF = 0;
				for(var k=0;k<9;k++){
					if(grille[i][j][k]!=="."){
						nbF += 1;
					}
                }
            }
        }
				if(nbF===1){
				    if (debug==="true"){
				    	nbferm();
				    	display();
				    	résoudre(i,j);
				    }
				    if (debug==="false"){
				    	nbferm();
				    	résoudre(i,j);
				    
                    }
                else 
                    return "Il n'y a aucune case de fermées après la propagation"
				
			
		
			}
	continuation();
	}
}

var start = function(liste){
	for(var i = 0;i<liste.length;i++){
		if (liste[i]==="display")
			diplay();
		else if (liste[i]==="stats")
			stat(true);
		else if (liste[i]==="solve")
			solve(false);
		else if (liste[i]==="detail")
			detail();
		else if (liste[i].includes("play")){
			var col = liste[i].charAt(5);
			var lig = liste[i].charAt(7);
			var vale = liste[i].charAt(9);
			play(col,lig,vale);
		}
		else{
			print("La commande est inconnue");
		}
	}
};

start(commandes);