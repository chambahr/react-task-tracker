
import PropTypes from 'prop-types'

const Button = ({ text, color, onClick }) => {

	return <button onClick={onClick} style={{backgroundColor: color }} className='btn'>
			{text}
		   </button>
}

Button.default = {
	color: 'steelblue'
}

Button.propTypes = {
	text: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
}

export default Button