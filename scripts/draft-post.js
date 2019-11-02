// 	BACKEND!
//	Check line 237 for comments how to read from post editor
//

let textInput = "";
let textOutput = "";

let inputState = [""];
let stateIndex = 0;
const Delta = Quill.import('delta');
const editorBody = document.getElementById("post-body");
editorBody.focus();


document.getElementById("file-upload").addEventListener("change", e =>
{
	if (!e.target.files || !e.target.files[0])
		return;
	let reader = new FileReader();
	reader.onload = eReader =>
	{
		quill.clipboard.dangerouslyPasteHTML(quill.getSelection().index, 
			`<img src=${eReader.target.result} >`);
		//setTimeout(() => editorBody.scrollTo(0, editorBody.scrollHeight), 200);
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
			editorBody.focus();
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
				modal.style.opacity = "0";
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
				editorBody.focus();
			}
			document.getElementById("modal-submit").addEventListener("click", addLink);
			document.getElementById("links-modal").addEventListener("keydown", e =>
			{
				if (e.key === "Enter")
				{
					addLink();
					e.preventDefault();
				}
				if (e.key === "Escape")
				{
					modal.style.display = "none";
					modal.style.opacity = "0";
					setTimeout(() => quill.setSelection(JSON.parse(modal.getAttribute("data-range"))), 0);
				}
			})
			document.getElementById("modal-close").addEventListener("click", e => 
			{
				modal.style.display = "none";
				modal.style.opacity = "0";
				setTimeout(() => quill.setSelection(JSON.parse(modal.getAttribute("data-range"))), 0);
			});
			modal.style.opacity = "100";
			modal.style.display = "flex";
			setTimeout(() => document.getElementById("link-address").focus(), 0);
		}
	}
}

let quill = new Quill('#post-body', 
{
	modules: 
	{
		toolbar: toolbarOptions,
		history: 
		{
			maxStack: 500
		}
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
	let index = quill.getSelection().index;
	let range = quill.getSelection().length;
	let currentFormat = quill.getFormat(index, range);
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


editorBody.addEventListener("paste", e =>
{
	let index = quill.getSelection().index;
	let range = quill.getSelection().length;
	if (range)
		quill.deleteText(index, range);
	let paste = (e.clipboardData || window.clipboardData).getData('text');
	quill.insertText(index, paste);
	setTimeout(() => quill.setSelection(index + paste.length), 0);
	e.preventDefault();
	return false;
})
editorBody.addEventListener("keydown", e =>
{
	if (e.ctrlKey && e.code === "KeyZ")
	{
		e.preventDefault();
		quill.history.undo();
	}
	else if (e.ctrlKey && e.code === "KeyY")
	{
		e.preventDefault();
		quill.history.redo();
	}
	else if (e.ctrlKey && e.code === "KeyL")
	{
		e.preventDefault();
		document.querySelector(".ql-link").click();
	}
	else if (e.ctrlKey && e.code === "KeyE")
	{
		e.preventDefault();
		document.querySelector(".ql-align").click();
	}
	else if (e.ctrlKey && e.code === "KeyQ")
	{
		e.preventDefault();
		document.querySelector(".ql-blockquote").click();
	}
	else if (e.ctrlKey && e.code === "KeyH")
	{
		e.preventDefault();
		document.querySelector(".ql-header").click();
	}
})

document.getElementById("create-post").addEventListener("click", e =>
{
	let postTitle = document.getElementById("post-title").value;
	let postBody = DOMPurify.sanitize(editorBody.innerHTML);
	let filteredPostBody = postBody.replace(/content-editable="true"/gi, 'content-editable="false"');

	///		Note to BE:
	///  Save filteredPostBody as the body of the post to database. 
	///  Sanitize it at the server too, with DOMPurify or similar libraries for security reasons, since it is HTML string
	///  Save postTitle as the title of the post. It's just a string, so no need for serious sanitization
})

document.getElementById("editor-header").addEventListener("click", e =>
{
	editorBody.focus();
})

document.getElementById("undo").addEventListener("click", () => quill.history.undo());
document.getElementById("redo").addEventListener("click", () => quill.history.redo());