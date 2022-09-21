var Produtos = []; // Array
var Produto = null;

function NewProduto(){
	return {
		Codigo: "",
		Descricao: "",
		Marca:	"",
		Unidade_de_medida: "",
		Preço_de_custo:"",
		Preço_de_venda: "",
		Estoque_atual: ""
		
	};
}

function adicionar(){
	Produto = NewProduto();
	
	$("#form-listagem").hide();
	$("#form-cadastro").show();
	
	$("#ovTXT_Codigo").val("");
	$("#ovTXT_Descricao").val("");
	$("#ovTXT_Marca").val("");
	$("#ovTXT_Unidade_de_medida").val("");
	$("#ovTXT_Preço_de_custo").val("");
	$("#ovTXT_Preço_de_venda").val("");
	$("#ovTXT_Estoque_atual").val("");
}

function cancelar(){
	$("#form-listagem").show();
	$("#form-cadastro").hide();
}

function salvar(){
	if (Produto.Codigo == "") {
		// Inserção
		Produto.Codigo = $("#ovTXT_Codigo").val();
		Produto.Descricao = $("#ovTXT_Descricao").val();
		Produto.Marca = $("#ovTXT_Marca").val();
		Produto.Unidade_de_medida = $("#ovTXT_Unidade_de_medida").val();
		Produto.Preço_de_venda= $("#ovTXT_Preço_de_venda").val();
		Produto.Preço_de_custo= $("#ovTXT_Preço_de_custo").val();
		Produto.Preço_de_venda= $("#ovTXT_Preço_de_venda").val();
		Produto.Estoque_atual= $("#ovTXT_Estoque_atual").val();
		Produtos.push(Produto);

	} else {
		// Percorrer Produtos
		for(var i=0; i < Produtos.length; i++){
			// Encontrar o Produto com o mesmo código
			if (Produtos[i].Codigo == Produto.Codigo){
				// Setar a Descrição
				Produtos[i].Descricao = $("#ovTXT_Descricao").val();
			}
		}
	}
	
	// Carregar Produtos
	carregarProdutos();
	
	$("#form-listagem").show();
	$("#form-cadastro").hide();
}

function carregarProdutos(){
	$("#ovTR_Produtos tbody").html("");
	Produtos.map(function (prod){
		// Iteração entre os itens da lista...
		$("#ovTR_Produtos tbody").append(
			"<tr>" + 
			"   <td>" + prod.Codigo + "</td>" +
			"   <td>" + prod.Descricao + "</td>" +
			"   <td>" + prod.Marca + "</td>" +
			"   <td>" + prod.Unidade_de_medida + "</td>" +
			"   <td>" + prod.Preço_de_custo + "</td>" +
			"   <td>" + prod.Preço_de_venda+ "</td>" +
			"   <td>" + prod.Estoque_atual+ "</td>" +
			
			
			"   <td><button type='button' " + 
			"               class='btn btn-editar btn-secondary' " +
            "               data-codigo='"+ prod.Codigo + "'>" +
			"       <i class='fa fa-edit'></i> Editar</button>" +
			"       <button type='button' " + 
			"               class='btn btn-remover btn-danger' " +
            "               data-codigo='"+ prod.Codigo + "'>" +
			"       <i class='fa fa-trash'></i> Remover</button>" +	
			"   </td>" +
			"</tr>"
		);
	});
	addEventEditar();
	addEventRemover();
}

function addEventRemover(){
	$(".btn-remover").each(function (){
		$(this).on("click", function (){
			var codigoProduto = $(this).attr("data-codigo");
			
			// PrimeiraForma
			Produtos = Produtos.filter(function(produtoCorrente){
				return produtoCorrente.Codigo != codigoProduto;
			});
			carregarProdutos();
			
			// SegundaForma
			var ProdutosAux = [];
			for(var i = 0; i < Produtos.length; i++)
				if (Produtos[i].Codigo != codigoProduto)
					ProdutosAux.push(Produtos[i]);
			Produtos = ProdutosAux;
			carregarProdutos();
			
			
		});
	});
}

function addEventEditar(){
	$(".btn-editar").each(function (){
		$(this).on("click", function (){
			var codigoProduto = $(this).attr("data-codigo");
			
			for(var i = 0; i < Produtos.length; i++){
				if (Produtos[i].Codigo == codigoProduto){
					Produto = Produtos[i];
					$("#ovTXT_Codigo").val(Produto.Codigo);
					$("#ovTXT_Marca").val(Produto.Marca);
					$("#ovTXT_Unidade_de_medida").val(Produto.Unidade_de_medida);
					$("#ovTXT_Preço_de_custo").val(Produto.Preço_de_custo);
					$("#ovTXT_Preço_de_venda").val(Produto.Preço_de_venda);
					$("#ovTXT_Estoque_atual").val(Produto.Estoque_atual);
				}
			}
			
			// Esconder a tabela e mostrar o formulário
			$("#form-listagem").hide();
			$("#form-cadastro").show();						
		});
	});
	
}

$(document).ready(function (){
	$("#form-cadastro").hide();
	
	$(document).on("click", "#ovBTN_Adicionar", adicionar);
	$(document).on("click", "#ovBTN_Cancelar", cancelar);
	$(document).on("click", "#ovBTN_Salvar", salvar);
	
});

