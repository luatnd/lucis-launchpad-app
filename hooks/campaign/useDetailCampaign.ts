import { gql, useQuery } from "@apollo/client";

export function useDetailCampaign() {
    const {loading, error, data} = useQuery(DETAILCAMPAIGN);
    const { loading: loadingOpening, error: errorOpening, data: dataOpening } = useQuery(ISINWHITELIST);

    return { loading, error, data: data, dataOpening };
}

const DETAILCAMPAIGN = gql`
  query { 
    campaignDetail(where: {uid: "cl02lx5or0000doo018d7n2zz"}, include: {game:true}) {
        uid
        game_uid
        name
        desc
        rules
        cover_img
        rounds{
            id
            name
            description
            is_whitelist
            require_whitelist
            participant_limit
            start
            end
        }
        status
        start
        end
        
    }
  }
`;

const ISINWHITELIST = gql(`
    query { 
        isInWhitelist(box_campaign_uid: "cl02lx5or0000doo018d7n2zz") 
    }
`)
