
import dynamic from 'next/dynamic';
import RickAndMorty from '../components/RickMorty';
const RMView = dynamic(() => import('../components/RickMorty'), { ssr: false })


// function RM() {
// 	return (
// 		<div>
// 			<RickAndMorty />
// 		</div>
// 	)
// }

export default RMView;