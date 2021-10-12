
import PropTypes from 'prop-types'
import { FaTimes } from 'react-icons/fa'

const Tasks = ({task, onDelete, onToggle}) => {
	return (
		<div className={`tasks ${task.reminder ? 'reminder' : ''}`} 
			onDoubleClick={ () => onToggle(task.id)}>
			<h3>{task.text} <FaTimes style={{color:'red', cursor:'pointer'}} onClick={() => onDelete(task.id)} /></h3>
			<p>{task.day}</p>
		</div>
	)
}

Tasks.propTypes = {

}

export default Tasks