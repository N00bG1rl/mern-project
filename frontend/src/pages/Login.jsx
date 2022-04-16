import { useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../features/auth/authSlice'
import { toast } from 'react-toastify'

const initialState = {
	email: '',
	password: '',
}

function Login() {
	const [formData, setFormData] = useState(initialState)
	const { email, password } = formData
	const dispatch = useDispatch()

	const { user, isLoading, isSuccess, message } = useSelector(
		state => state.auth
	)

	const onChange = e => {
		setFormData(state => ({
			...state,
			[e.target.name]: e.target.value,
		}))
	}

	const onSubmit = e => {
		e.preventDefault()

		const userData = {
			email,
			password,
		}

		dispatch(login(userData))
	}

	return (
		<>
			<section className='heading'>
				<h1>
					<FaSignInAlt />
					Login
				</h1>
			</section>

			<section className='form'>
				<form onSubmit={onSubmit}>
					<div className='form-group'>
						<input
							type='email'
							className='form-control'
							id='email'
							name='email'
							value={email}
							onChange={onChange}
							placeholder='Enter your email'
							required
						/>
					</div>

					<div className='form-group'>
						<input
							type='text'
							className='form-control'
							id='password'
							name='password'
							value={password}
							onChange={onChange}
							placeholder='Enter your password'
							required
						/>
					</div>

					<div className='form-group'>
						<button type='submit' className='btn btn-block'>
							Login
						</button>
					</div>
				</form>
			</section>
		</>
	)
}

export default Login
