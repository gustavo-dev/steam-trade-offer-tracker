import { SteamTradeOffer, TradeOfferState } from "./SteamTradeOfferTrackerBase";

export class TradeOffer {
    id: string;
    assetsIds: string[];
    partnerId: string;
    timeCreated: number;
    tradeOfferState: TradeOfferState;
    isOurOffer: boolean;

    constructor(
        offer: Pick<
            SteamTradeOffer,
            | "tradeofferid"
            | "items_to_give"
            | "accountid_other"
            | "time_created"
            | "trade_offer_state"
            | "is_our_offer"
        >
    ) {
        this.id = offer.tradeofferid;
        this.assetsIds = offer.items_to_give
            .map((item) => item.assetid)
            .sort((a, b) => a.localeCompare(b));
        this.partnerId = offer.accountid_other.toString();
        this.timeCreated = offer.time_created;
        this.tradeOfferState = offer.trade_offer_state;
        this.isOurOffer = offer.is_our_offer;
    }

    itemsEqual = (assets_ids: string[]) => {
        return (
            assets_ids.sort((a, b) => a.localeCompare(b)).toString() ===
            this.assetsIds.toString()
        );
    };
}