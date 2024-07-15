import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CfValorEntity } from "./CfValor";
import Price from "../../domain/entity/Price";

@Entity("cf_produto", { schema: "cf_teste" })
export class CfProdutoEntity {
  @PrimaryGeneratedColumn({ type: "bigint", name: "prod_id" })
  prodId: string;

  @Column("text", { name: "prod_nome", nullable: true })
  prodNome: string | null;

  @Column("longtext", { name: "prod_apresentacao", nullable: true })
  prodApresentacao: string | null;

  @Column("varchar", { name: "prod_embalagem", nullable: true, length: 100 })
  prodEmbalagem: string | null;

  @Column("varchar", { name: "prod_sessao", nullable: true, length: 75 })
  prodSessao: string | null;

  @Column("varchar", { name: "prod_grupo", nullable: true, length: 75 })
  prodGrupo: string | null;

  @Column("varchar", { name: "prod_subgrupo", nullable: true, length: 75 })
  prodSubgrupo: string | null;

  @Column("text", { name: "prod_descricao", nullable: true })
  prodDescricao: string | null;

  @Column("int", { name: "prod_empresa", nullable: true })
  prodEmpresa: number | null;

  @Column("int", { name: "prod_estabelecimento", nullable: true })
  prodEstabelecimento: number | null;

  @Column("varchar", { name: "prod_cod", nullable: true, length: 50 })
  prodCod: string;

  @Column("int", { name: "prod_filial", nullable: true })
  prodFilial: number | null;

  @Column("varchar", { name: "prod_sku", nullable: true, length: 300 })
  prodSku: string | null;

  @Column("varchar", { name: "prod_proporcao", nullable: true, length: 50 })
  prodProporcao: string | null;

  @Column("varchar", { name: "prod_desc", nullable: true, length: 200 })
  prodDesc: string | null;

  @Column("text", { name: "prod_revisao", nullable: true })
  prodRevisao: string | null;

  @Column("varchar", { name: "prod_flag100g", length: 2 })
  prodFlag100g: string;

  @Column("varchar", { name: "prod_desc_alt", nullable: true, length: 255 })
  prodDescAlt: string | null;

}
