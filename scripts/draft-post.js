// 
//	The output of the input editor is a HTML partial that is the value of:
//    document.getElementById("post-body").innerHTML
//

let textInput = "";
let textOutput = "";

let inputState = [""];
let stateIndex = 0;
const Delta = Quill.import('delta');

document.getElementById("file-upload").addEventListener("change", e =>
{
	if (!e.target.files || !e.target.files[0])
		return;
	let reader = new FileReader();
	reader.onload = eReader =>
	{
		quill.clipboard.dangerouslyPasteHTML(quill.getSelection().index, 
			`<img src=${eReader.target.result} >`);
		setTimeout(() => document.getElementById("post-body").scroll(
		{
		  top: 1000,
		  behavior: 'smooth'
		}), 1000);
	}
	reader.readAsDataURL(e.target.files[0]);
})

let toolbarOptions = 
{
	container: "#editor-header",
	handlers: 
	{
		'link': () =>
		{
			document.getElementById("post-body").focus();
			let modal = document.getElementById("links-modal");
			let range = quill.getSelection();
			modal.setAttribute("data-lock", "unlocked");
			modal.setAttribute("data-range", JSON.stringify(range));
			document.getElementById("link-address").value = "";
			document.getElementById("link-desc").value = quill.getText(range.index, range.length).trim();
			const addLink = e =>
			{
				if (modal.getAttribute("data-lock") === "locked")
					return;
				modal.setAttribute("data-lock", "locked");
				range = JSON.parse(modal.getAttribute("data-range"));
				let normalizedLink = document.getElementById("link-address").value;
				normalizedLink = /^https?\:\/\//.test(normalizedLink) ? 
					normalizedLink : "https://" + normalizedLink;
				modal.style.display = "none";
				if (range.length > 0)
					quill.deleteText(range.index, range.length);
				let linkDesc = document.getElementById("link-desc").value.length ? 
					document.getElementById("link-desc").value : document.getElementById("link-address").value;
				quill.insertText(range.index, linkDesc, 
				{
					color: "blue",
					underline: true,
					link: normalizedLink
				});
				quill.insertText(range.index + linkDesc.length, " ", 
				{
					color: "black",
					underline: null,
					link: null
				})
				quill.setSelection(range.index + linkDesc.length + 1);
				document.getElementById("post-body").focus();
			}
			document.getElementById("modal-submit").addEventListener("click", addLink);
			document.getElementById("links-modal").addEventListener("keydown", e =>
			{
				if (e.key === "Enter")
				{
					addLink();
					e.preventDefault();
				}
			})
			document.getElementById("modal-close").addEventListener("click", e => 
			{
				modal.style.display = "none";
				document.getElementById("post-body").focus();
			});
			modal.style.display = 'flex';
			setTimeout(() => document.getElementById("link-address").focus(), 0);
		},
		'image': function(value)
		{
			//quill.insertEmbed(1, 'image', 'https://res.cloudinary.com/fabianu.png');
			//quill.updateContents(new Delta().insert('Hello ', {color: "blue", underline: true});
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


const optionsTable =  
{
	"bold": document.querySelector(".ql-bold"),
	"italic": document.querySelector(".ql-italic"),
	"underline": document.querySelector(".ql-underline"),
	"link": document.querySelector(".ql-link"),
	"blockquote": document.querySelector(".ql-blockquote"),
	"header": document.querySelector(".ql-header"),
	"list": document.querySelector(".ql-list")
}
const alignIcon = document.querySelector(".ql-align");
alignIcon.addEventListener("click", e =>
{
	alignIcon.classList.remove("ql-active");
	if (alignIcon.getAttribute("data-current") === "left")
	{
		alignIcon.setAttribute("data-current", "center");
		alignIcon.value = "right";
		alignIcon.firstChild.setAttribute("src", "images/center-align-icon.png");
	}
	else if (alignIcon.getAttribute("data-current") === "center")
	{
		alignIcon.setAttribute("data-current", "right");
		alignIcon.setAttribute("value", "left");
		alignIcon.classList.add("ql-active");
		alignIcon.firstChild.setAttribute("src", "images/right-align-icon.png");
	}
	else
	{
		alignIcon.setAttribute("data-current", "left");
		alignIcon.setAttribute("value", "center");
		alignIcon.firstChild.setAttribute("src", "images/left-align-icon.png");
	}
})

for (let option in optionsTable)
{
	optionsTable[option].addEventListener("click", e =>
	{
		if (!/\boption\b/.test(e.target.classList))
			return;
		if (/\bactive-option\b/.test(e.target.classList))
			e.target.classList.remove("active-option")
		else
			e.target.classList.add("active-option")
	})
}

quill.on("editor-change", e => 
{
	if (!quill.getSelection())
		return;
	let currentFormat = quill.getFormat(quill.getSelection().index, quill.getSelection().length);
	for (let option in optionsTable)
	{
		if (currentFormat[option] != null)
			optionsTable[option].classList.add("active-option")
		else
			optionsTable[option].classList.remove("active-option");
	}
	switch(currentFormat.align)
	{
		case "center": alignIcon.firstChild.setAttribute("src", "images/center-align-icon.png"); break;
		case "right": alignIcon.firstChild.setAttribute("src", "images/right-align-icon.png"); break;
		default: alignIcon.firstChild.setAttribute("src", "images/left-align-icon.png"); break;
	}
})

document.getElementById("editor-header").addEventListener("click", e =>
{
	document.getElementById("post-body").focus();
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