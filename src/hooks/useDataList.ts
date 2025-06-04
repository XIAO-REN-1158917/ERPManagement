import React, { useEffect, useState, useCallback } from "react";


type MyFormData = {
    [key: string]: any
}

// page and pageSize are always needed
// The FormData type for each table is different, so T
// & is used to denote an intersection type annotation.
interface DataFetcher<T> {
    (args: T & { page: number, pageSize: number }): Promise<any>
}

// Analysis: Retrieving data requires the form content and the corresponding API,
// So, two paramters are set.

// T: This refers to the type of parameters(object) that need to be included when making a request.
// For example, in User page, the parameters are companyName, contact and phone. 
// In the bill page, the parameters are data, no, etc.
// Therefore, a generic palaceholder is used here, but the basic format is always key-value pair,
// so it is constrained by MyFormData

// U: This represents the type of data columns for each table.
// Since the column configurations vary across tables, a generic palaceholder is used here.
// This approach facilitates type validation when retrieving data and ensures it can be stored in Redux correctly.
function useDataList<T extends MyFormData, U>(initialFormData: T, fetchData: DataFetcher<T>) {
    const [dataList, setDataList] = useState<U[]>([])
    const [page, setPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(10)
    const [total, setTotal] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState<T>(initialFormData)

    // Utilise caching functionality to ensure the loadData is only called when dependencies change.
    // Otherwise, frequent and unnecessary changes to the page data can degrade performance.

    //The issue here is that Formdata must be included as a dependency; otherwise, data cannot be loaded
    //when FormData updates. However, this results in repeated requests being sent when typing in the search box.
    // It is necessary to determine whether to use useCallback based on the specific scenario.
    const loadData = useCallback(async () => {
        setLoading(true)

        // Defensive programming for greater robustness.
        try {
            const { data: { list, total } } = await fetchData({ page, pageSize, ...formData })
            setDataList(list)
            setTotal(total)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }, [formData, page, pageSize, fetchData])

    useEffect(() => {
        loadData()
    }, [loadData])

    //Differentiate input fields by their name and then update the corresponding value.
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const reset = () => {
        setPage(1)
        setPageSize(10)
        setFormData(initialFormData)
    }


    const onChange = (page: number, pageSize: number) => {
        setPage(page)
        setPageSize(pageSize)
    }
    return { dataList, page, pageSize, total, loading, formData, setDataList, setPage, setPageSize, setTotal, setLoading, setFormData, loadData, onChange, handleChange, reset }
}

export default useDataList