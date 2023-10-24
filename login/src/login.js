/***
  
  Rajador Developer

  ▒█▀▀█ ░█▀▀█ ░░░▒█ ░█▀▀█ ▒█▀▀▄ ▒█▀▀▀█ ▒█▀▀█ 
  ▒█▄▄▀ ▒█▄▄█ ░▄░▒█ ▒█▄▄█ ▒█░▒█ ▒█░░▒█ ▒█▄▄▀ 
  ▒█░▒█ ▒█░▒█ ▒█▄▄█ ▒█░▒█ ▒█▄▄▀ ▒█▄▄▄█ ▒█░▒█

  GitHub: https://github.com/RajadorDev

  Discord: rajadortv

***/

const inputs = 
[
	{
		title: 'Your Username:',
		name: 'username', //IMPORTANT the input name that is sended with the form! 🤓👍
		only_allowed_letters: true,
		attributes: {
			maxlength: 20,
			minlength: 5,
			type: 'text',
			required: true
		}
	},
	{
		title: 'Your Password:',
		name: 'password',
		attributes: {
			minlength: 4,
			maxlength: 20,
			type: 'password',
			required: true
		}
	}
]

const FORM_METHOD = 'POST' //Set 'POST' or 'GET'

const LOGIN_PAGE = '#' //Your login backend page here (example: http://yourdomain.com/login/LoginBackend.php)


const allow_parse = []



const ALLOWED_LETTERS = 'abcdefghijklmnopqrstuvwxyz0987654321_'


function onDOMLoad()
{
	let inputBox = document.querySelector('.login-box')
	let id = 0
	
	for (let i of inputs)
	{
		id += 1
		
		let inputId = String(id)
		
		let inputElement = document.createElement('input')
		
		
		if ('attributes' in i)
		{
			for (let atIndex of Object.keys(i.attributes))
			{
				let value = i.attributes[atIndex]
				
				inputElement.setAttribute(atIndex, value)
				
			}
		}
		
		inputElement.id = inputId
		
		
		if ('name' in i)
		{
			inputElement.setAttribute('name', i.name)
		} else {
			error = 'Please set the input name in: ' + JSON.stringify(i)
			
			let p = document.createElement('p')
			
			p.textContent = error
			
			p.classList.add('error')
			
			inputBox.appendChild(p)
			
			console.log(error)
			
			continue
		}
		
		inputElement.classList.add('login-input')
		
		inputElement.oninput = onInput
		
		let inputTitle = document.createElement('label')
		
		inputTitle.classList.add('input-description')
		
		
		let inputLabelText = 'title' in i ? i.title : 'Unknow'
		
		inputTitle.textContent = inputLabelText
		
		inputTitle.setAttribute('for', inputId)
		
		inputBox.appendChild(inputTitle)
		inputBox.appendChild(inputElement)
		
		if ('only_allowed_letters' in i && i.only_allowed_letters)
		{
			allow_parse.push(inputElement)
		}
		
	}
	
	
	if (inputs.length > 0)
	{
		let b = document.createElement('input')
		b.setAttribute('type', 'submit')
		b.classList.add('submit-login')
		inputBox.appendChild(b)
	}
	
	let form = document.querySelector('form')
	
	if (form)
	{
		form.setAttribute('method', FORM_METHOD)
		form.setAttribute('action', LOGIN_PAGE)
	}
	
}


function allowParse(input)
{
	if (allow_parse.includes(input))
	{
		let letters = input.value
		for (let letter of letters)
		{
			if (!ALLOWED_LETTERS.includes(letter.toLowerCase()))
			{
				return false
			}
		}
	}
	return true
}


function onInput(e)
{
	let input = e.target 
	if (!allowParse(input))
	{
		if ('oldValue' in input)
		{
			input.value = input.oldValue
		} else {
			input.value = ''
		}
		return false
	}
	
	input.oldValue = input.value
	return true
}
