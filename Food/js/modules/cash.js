function cash (element, local) {
        let res =  fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
    
        return res.json();
    };
    
    async function getResource(url) {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }
    
    export {postData};
    export {getResource};
