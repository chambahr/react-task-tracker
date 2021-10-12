
import PropTypes from 'prop-types'

import Tasks from './Tasks'

const Task = ({task, onDelete, onToggle}) => {

	return (
		<>
			{task.map((task, index) => (
				<Tasks key={index} 
					task={task} 
					onToggle={onToggle} 
					onDelete={onDelete} />
			 ))}	
		</>
	)
}

Task.propTypes = {

}

export default Task