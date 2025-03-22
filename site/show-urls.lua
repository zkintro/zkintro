function Link(el)
    return {
        el,
        pandoc.Space(),
        pandoc.Str("("),
        pandoc.Str(el.target),
        pandoc.Str(")")
    }
end