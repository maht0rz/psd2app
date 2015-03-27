require 'psd'
require 'json'

psd = PSD.new('src/assets/psds/test.psd')

psd.parse!

puts psd.tree.children_at_path('menu/Comments').first.first.image.save_as_png 'src/assets/images/t.png'

File.open('src/assets/test.meta.json', 'w+') do |f|
    f.puts JSON.pretty_generate({
        width: psd.header.cols,
        height: psd.header.rows
    })
end

File.open('src/assets/test.json', 'w+') do |f|
    f.puts JSON.pretty_generate(psd.tree.to_hash)
end



psd.image.save_as_png 'src/assets/test.png'
