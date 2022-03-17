# # Download zim file.
# wget https://download.kiwix.org/zim/wikipedia/wikipedia_bm_all_maxi_2022-02.zim

# # Get zim tools
# wget https://download.openzim.org/release/zim-tools/zim-tools_linux-x86_64-3.1.0.tar.gz -O zimtools.tar.gz;
# tar xvzf zimtools.tar.gz;

./downloads/zimtools/zimdump dump --dir=./wiki  ./downloads/wiki.zim
python3 scripts/indexCreator.py

# python3 scripts/indexCreator.py && cd wiki && tar -cf ../wiki.tar . && cd .. && rm -rf wiki