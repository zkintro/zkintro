local urls = {}
local url_counter = 0

function Link(el)
    local url = el.target
    if not urls[url] then
        url_counter = url_counter + 1
        urls[url] = url_counter
    end
    
    return {
        el,
        pandoc.Space(),
        pandoc.Str("["),
        pandoc.Str(tostring(urls[url])),
        pandoc.Str("]")
    }
end

function Doc(doc)
    if url_counter > 0 then
        -- Add a page break before references
        table.insert(doc.blocks, pandoc.RawBlock("latex", "\\clearpage"))
        -- Add the References header
        table.insert(doc.blocks, pandoc.Header(1, pandoc.Str("References")))
        
        -- Sort URLs by their reference number
        local sorted_urls = {}
        for url, num in pairs(urls) do
            sorted_urls[num] = url
        end
        
        -- Add each reference
        for i = 1, url_counter do
            table.insert(doc.blocks, pandoc.Para({
                pandoc.Str("[" .. i .. "]"),
                pandoc.Space(),
                pandoc.Link(pandoc.Str(sorted_urls[i]), sorted_urls[i], "")
            }))
        end
    end
    return doc
end