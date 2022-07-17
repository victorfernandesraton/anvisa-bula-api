declare module "config/index" {
    namespace _default {
        namespace server {
            const port: string;
        }
    }
    export default _default;
}
declare module "entity/medicItem" {
    export class MedicItem {
        /**
        * @param {{
         * name: string,
         * seller: any,
         * bulaId: string
         * publishedAt: string,
         * patientBulaURI: URL
         * doctorBulaURI: URL
         * }}
         * @return {MedicItem}
         */
        static create({ name, doctorBulaURI, patientBulaURI, publishedAt, seller, bulaId }: {
            name: string;
            seller: any;
            bulaId: string;
            publishedAt: string;
            patientBulaURI: URL;
            doctorBulaURI: URL;
        }): MedicItem;
        /**
         * @param {{
         * name: string,
         * seller: any,
         * publishedAt: string,
         * bulaId: string
         * patientBulaURI: URL
         * doctorBulaURI: URL
         * }}
         */
        constructor({ name, doctorBulaURI, patientBulaURI, publishedAt, bulaId, seller }: {
            name: string;
            seller: any;
            publishedAt: string;
            bulaId: string;
            patientBulaURI: URL;
            doctorBulaURI: URL;
        });
        name: string;
        bula: {
            doctor: URL;
            patient: URL;
        };
        seller: {
            name: any;
            cnpj: any;
        };
        publishedAt: string;
        id: string;
    }
}
declare module "scrapper/findAllBulas" {
    export class FindAllBulas {
        constructor(browser: any);
        browser: any;
        /**
         *
         * @param {{
         * name?: string
         * registerNumber?: string
         * bulaId?: string | number
         * retailCnpj?: string | number
         * }} param0
         * @returns {Promise<MedicItem[]>}
         */
        execute({ name, registerNumber, bulaId, retailCnpj }: {
            name?: string;
            registerNumber?: string;
            bulaId?: string | number;
            retailCnpj?: string | number;
        }): Promise<MedicItem[]>;
    }
    import { MedicItem } from "entity/medicItem.mjs";
}
declare module "scrapper/index" {
    export { FindAllBulas };
    import { FindAllBulas } from "scrapper/findAllBulas.mjs";
}
declare module "service/scrapper" {
    export function scrapperFactory({ productin }: {
        productin: any;
    }): Promise<import("puppeteer").Browser>;
}
//# sourceMappingURL=index.d.ts.map