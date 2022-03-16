# Download zim file.
# TODO: this should be received when running docker.
wget https://download.kiwix.org/zim/wikipedia/wikipedia_bm_all_maxi_2022-02.zim

# Get zim tools
wget https://download.openzim.org/release/zim-tools/zim-tools_linux-x86_64-3.1.0.tar.gz -O zimtools.tar.gz;
tar xvzf zimtools.tar.gz;

./zim-tools_linux-x86_64-3.1.0/zimdump dump --dir=./wiki  ./wikipedia_bm_all_maxi_2022-02.zim

python3 indexCreator.py && cd wiki && tar -cf ../wiki.tar . && cd .. && rm -rf wiki