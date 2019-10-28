import React from "react";
import { PageComponent, Page } from "../lib/page";

class AddArticle extends PageComponent {
  render() {
    return (
      <Page className="container" id={this.constructor.name}>
        <div className="section">
          <form className="z-depth-1 white">
            <div className="row">
              <div className="input-field col s12">
                <input id="title" type="text" />
                <label htmlFor="title">标题</label>
              </div>
              <div className="input-field col s12 m6">
                <input id="query_tile" type="text" />
                <label htmlFor="query_tile">查询标题</label>
              </div>
              <div className="input-field col s12 m6">
                <select defaultValue="0">
                  <option value="0">
                    未选择
                  </option>
                  <option value="1">类别 1</option>
                  <option value="2">类别 2</option>
                  <option value="3">类别 3</option>
                </select>
                <label>类别</label>
              </div>
              <div className="col s12">
                <ul className="tabs">
                  <li className="tab col s6">
                    <a className="active" href="#edit">
                      编辑
                    </a>
                  </li>
                  <li className="tab col s6">
                    <a href="#preview">预览</a>
                  </li>
                </ul>
              </div>
              <div id="edit" className="col s12">
                <div className="input-field">
                  <textarea
                    id="content"
                    className="materialize-textarea"
                    placeholder="请输入内容……"
                  ></textarea>
                </div>
              </div>
              <div id="preview" className="col s12">
                <div className="browser-default">
                  <h3 className="browser-default">我是预览结果</h3>
                  <p>我是预览内容。</p>
                </div>
              </div>
              <div className="input-field chips chips-initial col s12">
                <input className="input" placeholder="添加标签…" />
              </div>
              <div className="input-field col s6">
                <select multiple defaultValue={["0"]}>
                  <option value="0" disabled>
                    选择附加
                  </option>
                  <option value="1">置顶</option>
                  <option value="2">草稿</option>
                </select>
                <label>附加选项</label>
              </div>
              <div className="input-field col s6">
                <select defaultValue="0">
                  <option value="0">
                    未选择（开放）
                  </option>
                  <option value="1">审核匿名</option>
                  <option value="2">审核所有</option>
                  <option value="3">禁止匿名</option>
                  <option value="4">禁止所有</option>
                </select>
                <label>评论权限</label>
              </div>
            </div>
            <div id="push-article-fab" className="fixed-action-btn">
              <a className="btn-floating btn-large waves-effect waves-light blue">
                <i className="material-icons">send</i>
              </a>
            </div>
          </form>
        </div>
      </Page>
    );
  }
}

export default AddArticle;
