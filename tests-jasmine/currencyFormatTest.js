import { currencyFormat } from "../utils/functions.js";

describe('Test suite: currencyFormat',()=>{
    it('Converts cents into dollars',()=>{
        expect(currencyFormat(2095)).toEqual('20.95');
    });
    describe('Rounding',()=>{
        
        it('Properly rounds up decimal numbers',()=>{
            expect(currencyFormat(2000.5)).toEqual('20.01');
        })
    
        it('Properly rounds down decimal numbers',()=>{
            expect(currencyFormat(2000.4)).toEqual('20.00');
        })
    
        it('Works with 0',()=>{
            expect(currencyFormat(0)).toEqual('0.00');
        })
    })
   
});

