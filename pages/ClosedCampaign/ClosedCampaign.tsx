import CardItem from 'components/card/ContainerCard'
import TitleSection from 'components/TitleNameSection'
import s from '../UpComingPage/UpcomingCampaign.module.sass'
type Props = {}

const ListCard = [
    {
        srcGame: '/assets/UpComing/gameAxie.png',
        time: '1d 05h 30m 25s',
        nameGame: 'AXIE INFINITY',
        title: 'Build up a collection and use them across an ever expanding universe of games',
        statusTime: 'UpComing',
        styleBg: false,
    },
    {
        srcGame: '/assets/UpComing/gameAxie.png',
        time: '1d 05h 30m 25s',
        nameGame: 'AXIE INFINITY',
        title: 'Build up a collection and use them across an ever expanding universe of games',
        statusTime: 'SoldOut',
        styleBg: false,
    },
    {
        srcGame: '/assets/UpComing/gameAxie.png',
        time: '1d 05h 30m 25s',
        nameGame: 'AXIE INFINITY',
        title: 'Build up a collection and use them across an ever expanding universe of games',
        statusTime: 'UpComing',
        styleBg: false,
    },
    {
        srcGame: '/assets/UpComing/gameAxie.png',
        time: '1d 05h 30m 25s',
        nameGame: 'AXIE INFINITY',
        title: 'Build up a collection and use them across an ever expanding universe of games',
        statusTime: 'UpComing',
        styleBg: false,
    },
    {
        srcGame: '/assets/UpComing/gameAxie.png',
        time: '1d 05h 30m 25s',
        nameGame: 'AXIE INFINITY',
        title: 'Build up a collection and use them across an ever expanding universe of games',
        statusTime: 'SoldOut',
        styleBg: false,
    },
    {
        srcGame: '/assets/UpComing/gameAxie.png',
        time: '1d 05h 30m 25s',
        nameGame: 'AXIE INFINITY',
        title: 'Build up a collection and use them across an ever expanding universe of games',
        statusTime: 'UpComing',
        styleBg: false,
    },
]

export default function ClosedCampaign(props: Props) {
    return (
        <section className='lucis-container'>
            <TitleSection text='Closed campaign' />
            <div className={s.blockCard}>
                {ListCard.map((e, i) => (
                    <CardItem srcGame={e.srcGame} statusTime={e.statusTime} time={e.time} nameGame={e.nameGame} styleBg={e.styleBg} title={e.title} />
                ))}
            </div>
        </section>
    )
}