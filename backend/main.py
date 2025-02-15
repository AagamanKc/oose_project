import codecs

# Open the file in 'utf-8-sig' to handle BOM, and read the content
with codecs.open('movies_data_utf8.json', 'r', 'utf-8-sig') as source_file:
    content = source_file.read()

# Write the content to a new file in 'utf-8' without BOM
with codecs.open('movies_data_no_bom.json', 'w', 'utf-8') as target_file:
    target_file.write(content)

print("File saved without BOM.")
