import CardContainer from 'components/card/ContainerCard'
import TitleSection from 'components/TitleNameSection'
import s from './UpcomingCampaign.module.sass'

export default function UpComing () {
    return(
        <section className='lucis-container'>
            <TitleSection text='Upcoming campaign' />
            <CardContainer/>
        </section>
    )
}