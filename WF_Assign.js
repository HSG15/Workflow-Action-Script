/**
 * @NApiVersion 2.1
 * @NScriptType WorkflowActionScript
 */
define(['N/record', 'N/log'],
    (record, log) => {

        const onAction = (scriptContext) => {
            try {
                var po = scriptContext.newRecord;
                var total_qty = 0;
                var total_line = po.getLineCount({
                    sublistId: 'item'
                });

                for (var i = 0; i < total_line; i++) {
                    var qty = po.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'quantity',
                        line: i
                    });
                    total_qty += parseInt(qty); 
                }

                log.debug('Total Quantity', total_qty);

                // record.submitFields({
                //     type: record.Type.PURCHASE_ORDER,
                //     id: po.id,  
                //     values: {
                //         custbody_po_qty: total_qty 
                //     }
                // });

                log.debug('PO Qty updated');
                return total_qty
            } catch (error) {
                log.error('error is ', error);
            }
        };

        return { onAction };
    });
