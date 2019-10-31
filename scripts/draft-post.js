let textInput = "";
let textOutput = "";

let inputState = [""];
let stateIndex = 0;

let toolbarOptions = 
{
	container: "#editor-header",
	handlers: 
	{
		'link': function(value) 
		{
			if (value)
			{
				/*
				let modal = document.getElementById("links-modal");
				document.getElementById("modal-submit").addEventListener("click", 
				{
					modal.style.display = "none";
					this.quill.format('link', "Hey")
				}
				modal.style.display = 'flex';*/
				this.quill.format('link', "test ish");
			}
			else
				this.quill.format('link', false);
		}
	}
}

let quill = new Quill('#post-body', 
{
	modules: 
	{
		toolbar: toolbarOptions,
	},
	placeholder: 'Create a post. . .',
})

document.getElementById("post-body").addEventListener("keydown", e =>
{
	if (e.code === "Space")
	{
		inputState.push(document.getElementById("post-body").innerHTML);
		stateIndex++;
	}
})

const undo = () =>
{
	if (stateIndex === inputState.length - 1)
	{
		inputState.push(document.getElementById("post-body").innerHTML);
		stateIndex++;
	}
	if (stateIndex <= 0)
		return;
	stateIndex--;
	textInput = inputState[stateIndex];
	updateDisplay(textInput);
}

const redo = () =>
{
	if (stateIndex >= inputState.length - 1)
		return;
	stateIndex++;
	textInput = inputState[stateIndex];
	updateDisplay(textInput);
}

const updateDisplay = input =>
{
	textOutput = textInput;
	document.getElementById("post-body").innerHTML = textOutput;
}

document.getElementById("undo").addEventListener("click", undo);
document.getElementById("redo").addEventListener("click", redo);