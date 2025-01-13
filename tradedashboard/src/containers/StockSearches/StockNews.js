import React from 'react'

function StockNews({news}) {
  return (
    <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
                        <div className="searching_Reault_Right_overview_table">
                          <div className="table-responsive tabalignn custom-table searching_Reault_Right_table_Responsive">
                            <table className="table table-hover mb-0">
                              <tbody>
                                {
                                   news?.map((item) => (
                                        <tr >
                                        <td>
                                          <h6 className="mb-0 font-weight-bolder">{item?.title || ""}</h6>
                                          <p className="mb-0">{item.publishedDate}<span className="mx-1">|</span> {item?.text}</p>
                                        </td>
                                      </tr>
                                    ))
                                }
                               
                                
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
  )
}

export default StockNews