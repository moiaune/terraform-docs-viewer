const vscode = require('vscode');

async function OpenDocs() {
	const baseURL = "https://registry.terraform.io/providers/hashicorp/";
	const editor = vscode.window.activeTextEditor;
	const text = editor.document.getText(editor.selection);

	let provider = "";
	let indexFrom = 0;

	if (text.substr(0, 8) === "azurerm_") {
		provider = "azurerm/latest/docs/resources/";
		indexFrom = 8;
	} else if (text.substr(0, 8) === "azuread_") {
		provider = "azuread/latest/docs/resources/";
		indexFrom = 8;
	} else if (text.substr(0, 4) === "aws_") {
		provider = "aws/latest/docs/resources/";
		indexFrom = 4;
	}
	
	vscode.env.openExternal(baseURL + provider + text.substr(indexFrom));
}

function activate(context) {

	let disposable = vscode.commands.registerCommand(
		'terraform-docs-viewer.openDocs',
		function () {
			OpenDocs();
		}
	);

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
