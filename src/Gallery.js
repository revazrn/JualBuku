import React, {Component} from "react";
import { Modal } from 'bootstrap';
// import $ from 'jquery';
import Card from './Components/card';

class Gallery extends Component {
    constructor(){
        super()
        this.state = {
            buku: [
                {
                    isbn:"1245", judul:"Bulan", penulis:"Tere Liye",
                    penerbit:"CV Harapan Kita", harga: 90000,
                    cover:"https://cdn.gramedia.com/uploads/items/img20220905_11324048.jpg"
                },
                {
                    isbn:"12345", judul:"Selena", penulis:"Tere Liye",
                    penerbit:"CV Nusa Bangsa", harga: 80000,
                    cover:"https://cdn.gramedia.com/uploads/picture_meta/2023/2/6/bcekrdxnwcemqhgkreithj.jpg"
                },
                {
                    isbn:"12345", judul:"Bumi", penulis:"Tere Liye",
                    penerbit:"CV Nusa Bangsa", harga: 89000,
                    cover:"https://www.gramedia.com/blog/content/images/2021/04/bumi.jpg"
                },
                {
                    isbn:"12345", judul:"Bintang", penulis:"Tere Liye",
                    penerbit:"SABAKGRIP", harga: 95000,
                    cover:"https://cdn.gramedia.com/uploads/picture_meta/2023/4/10/ccmq4kges6gstnsrrtxabw.jpg"
                },
            ],

            action: "",
            isbn: "",
            judul: "",
            penulis: "",
            penerbit: "",
            harga: 0,
            cover: "",
            selectedItem: null,
            keyword:"",
            filterbuku: [],
            modal: null,
        }
        
        this.state.filterbuku = this.state.buku;
    }

    setUser = () => {
        if(sessionStorage.getItem("user") === null){
            let prompt = window.prompt("Masukkan Nama Anda","")
            if(prompt === null || prompt === ""){
                this.setUser()
            }else{
                sessionStorage.setItem("user", prompt)
                this.setState({user: prompt})
            }
        }else{
            let name = sessionStorage.getItem("user")
            this.setState({user: name})
        }
    }

    searching = event => {
        if (event.keyCode === 13) {
            
            let keyword = this.state.keyword.toLowerCase()
            let tempBuku = this.state.buku
            let result = tempBuku.filter((item) => {
                return ( 
                    item.judul.toLowerCase().includes(keyword) ||
                    item.penulis.toLowerCase().includes(keyword) ||
                    item.penerbit.toLowerCase().includes(keyword)
                )
            })

            this.setState({ filterBuku: result })
        }
    }

    addToCart = (selectedItem) => {
        let tempCart = []
        if(localStorage.getItem("cart") !== null){
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }

        let existItem = tempCart.find(item => item.isbn === selectedItem.isbn)
        if(existItem){
            window.alert("Anda telah memilih item ini")
        }else{
            let promptJumlah = window.prompt("Masukkan jumlah item yang dibeli", "")
            if(promptJumlah !== null && promptJumlah !== ""){
                selectedItem.jumlahBeli = promptJumlah
                tempCart.push(selectedItem)
                localStorage.setItem("cart", JSON.stringify(tempCart))
            }
        }
    }

    Add = () => {
        this.state.modal.show();
        this.setState({
            isbn: Math.random().toString(),
            judul: "",
            penulis: "",
            penerbit: "",
            cover: "",
            harga: 0,
            action: "insert"
        })
    }

    Edit = (item) => {
        this.state.modal.show();
        this.setState({
            isbn: item.isbn,
            judul: item.judul,
            penulis: item.penulis,
            penerbit: item.penerbit,
            cover: item.cover,
            harga: item.harga,
            action: "update",
            selectedItem: item
        })
    }

    Save = (event) => {

        event.preventDefault();
        let tempBuku = this.state.buku

        if (this.state.action === "insert"){
            tempBuku.push({
                isbn: this.state.isbn,
                judul: this.state.judul,
                penulis: this.state.penulis,
                penerbit: this.state.penerbit,
                cover: this.state.cover,
                harga: this.state.harga,
            });
        }else if(this.state.action === "update"){
            let index = tempBuku.indexOf(this.state.selectedItem)
            tempBuku[index].isbn = this.state.isbn
            tempBuku[index].judul = this.state.judul
            tempBuku[index].penulis = this.state.penulis
            tempBuku[index].penerbit = this.state.penerbit
            tempBuku[index].cover = this.state.cover
            tempBuku[index].harga = this.state.harga
        }

        this.setState({buku : tempBuku})

        this.state.modal.hide();
    };

    Drop = (item) => {
        if(window.confirm("Apakah anda yakin ingin mengahpus data ini?")){
            let tempBuku = this.state.buku
            let index = tempBuku.indexOf(item)

            tempBuku.splice(index, 1)
            this.setState({buku: tempBuku})
        }
    }

    render(){
        return(
            <div className="container">
                <h4 className="text-info my-2">
                    Nama Pengguna: {this.state.user}
                </h4>

                <input type="text" className="form-control my-2" placeholder="Pencarian"
                    value={this.state.keyword}
                    onChange={(ev) => this.setState({ keyword: ev.target.value })}
                    onKeyUp={(ev) => this.searching(ev)}
                />

                <div className="row">
                    {this.state.filterbuku.map((item, index) => (
                        <Card 
                        key={index}
                        judul={item.judul}
                        penulis={item.penulis}
                        penerbit={item.penerbit}
                        harga={item.harga}
                        cover={item.cover}
                        onEdit={() => this.Edit(item)}
                        onDrop={() => this.Drop(item)}
                        onCart={() => this.addToCart(item)}
                        />
                    ))}
                </div>

                <button className="btn btn-success" onClick={() => this.Add()}>
                            Tambah Data
                </button>

                <div className="modal" id="modal_buku">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    Form Buku 
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={ev => this.Save(ev)}>
                                        Judul Buku
                                        <input type="text" className="form-control mb-2" value={this.state.judul} onChange={ ev => this.setState({judul: ev.target.value})} required />

                                        Penulis Buku
                                        <input type="text" className="form-control mb-2" value={this.state.penulis} onChange={ ev => this.setState({penulis: ev.target.value})} required />

                                        Penerbit Buku
                                        <input type="text" className="form-control mb-2" value={this.state.penerbit} onChange={ ev => this.setState({penerbit: ev.target.value})} required />

                                        Harga Buku
                                        <input type="number" className="form-control mb-2" value={this.state.harga} onChange={ ev => this.setState({harga: ev.target.value})} required />

                                        Cover Buku
                                        <input type="url" className="form-control mb-2" value={this.state.cover} onChange={ ev => this.setState({cover: ev.target.value})} required />

                                        <button className="btn btn-info btn-block" type="submit">
                                            Simpan
                                        </button>
                                    </form>
                                </div>
                            </div>

                        </div>

                </div>
            </div>
        )
    }

    componentDidMount() {
        this.setState({
            modal: Modal.getOrCreateInstance("#modal_buku"),
        })
        this.setUser()
    }
}
export default Gallery;