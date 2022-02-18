import CardItem from 'components/card/ContainerCard'
import TitleSection from 'components/TitleNameSection'
import s from './UpcomingCampaign.module.sass'


type Props = {}

const ListCard = [
    {
        srcGame: '/assets/UpComing/gameAxie.png',
        time: '1d 05h 30m 25s',
        nameGame: 'AXIE INFINITY',
        title: 'Build up a collection and use them across an ever expanding universe of games',
    },
    {
        srcGame: '/assets/UpComing/gameAxie.png',
        time: '1d 05h 30m 25s',
        nameGame: 'AXIE INFINITY',
        title: 'Build up a collection and use them across an ever expanding universe of games',
    },
    {
        srcGame: '/assets/UpComing/gameAxie.png',
        time: '1d 05h 30m 25s',
        nameGame: 'AXIE INFINITY',
        title: 'Build up a collection and use them across an ever expanding universe of games',
    },
    {
        srcGame: '/assets/UpComing/gameAxie.png',
        time: '1d 05h 30m 25s',
        nameGame: 'AXIE INFINITY',
        title: 'Build up a collection and use them across an ever expanding universe of games',
    },
    {
        srcGame: '/assets/UpComing/gameAxie.png',
        time: '1d 05h 30m 25s',
        nameGame: 'AXIE INFINITY',
        title: 'Build up a collection and use them across an ever expanding universe of games',
    },
    {
        srcGame: '/assets/UpComing/gameAxie.png',
        time: '1d 05h 30m 25s',
        nameGame: 'AXIE INFINITY',
        title: 'Build up a collection and use them across an ever expanding universe of games',
    },
]

export default function UpComing(props: Props) {
    return (
        <section className='lucis-container'>
            <TitleSection text='Upcoming campaign' />
            <div className={s.blockCard}>
                {ListCard.map((e, i) => (
                    <CardItem srcGame={e.srcGame} time={e.time} nameGame={e.nameGame} title={e.title} />
                ))}
            </div>
        </section>
    )
}